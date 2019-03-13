/**
 * @module andresayak/myfindercommand
 */

import CKEditorError from '@ckeditor/ckeditor5-utils/src/ckeditorerror';
import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

/**
 * @extends module:core/command~Command
 */
export default class MyFinderCommand {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        this.editor = editor;
        window.myfinderChooseCallback = (url) => {
            editor.execute('imageInsert', {source: [url]});
        };
        this.value = undefined;
        this.isEnabled = true;

        this.decorate('execute');

        // By default every command is refreshed when changes are applied to the model.
        this.listenTo(this.editor.model.document, 'change', () => {
            this.refresh();
        });

        this.on('execute', evt => {
            if (!this.isEnabled) {
                evt.stop();
            }
        }, {priority: 'high'});

        // By default commands are disabled when the editor is in read-only mode.
        this.listenTo(editor, 'change:isReadOnly', (evt, name, value) => {
            if (value) {
                this.on('set:isEnabled', forceDisable, {priority: 'highest'});
                this.isEnabled = false;
            } else {
                this.off('set:isEnabled', forceDisable);
                this.refresh();
            }
        });
        this.stopListening(this.editor.model.document, 'change');
        this.listenTo(this.editor.model.document, 'change', () => this.refresh(), {priority: 'low'});
    }

    /**
     * @inheritDoc
     */
    refresh() {
        const imageCommand = this.editor.commands.get('imageUpload');
        const linkCommand = this.editor.commands.get('link');
        this.isEnabled = imageCommand && linkCommand && (imageCommand.isEnabled || linkCommand.isEnabled);
    }

    /**
     * @inheritDoc
     */
    execute() {
        const editor = this.editor;
        const openerMethod = this.editor.config.get('ckfinder.openerMethod') || 'modal';

        if (openerMethod != 'popup' && openerMethod != 'modal') {
            throw new CKEditorError('ckfinder-unknown-openerMethod: The openerMethod config option must by "popup" or "modal".');
        }

        const options = this.editor.config.get('ckfinder.options') || {};

        options.chooseFiles = true;

        const originalOnInit = options.onInit;

        if (!options.language) {
            options.language = editor.locale.language;
        }

        options.onInit = finder => {
            if (originalOnInit) {
                originalOnInit();
            }

            finder.on('files:choose', evt => {
                
                const files = evt.data.files.toArray();
                const links = files.filter(file => !file.isImage());
                const images = files.filter(file => file.isImage());

                for (const linkFile of links) {
                    editor.execute('link', linkFile.getUrl());
                }

                const imagesUrls = [];

                for (const image of images) {
                    const url = image.getUrl();
                    imagesUrls.push(url ? url : finder.request('file:getProxyUrl', {file: image}));
                }

                if (imagesUrls.length) {
                    insertImages(editor, imagesUrls);
                }
            });

            finder.on('file:choose:resizedImage', evt => {
                const resizedUrl = evt.data.resizedUrl;

                if (!resizedUrl) {
                    const notification = editor.plugins.get('Notification');
                    const t = editor.locale.t;

                    notification.showWarning(t('Could not obtain resized image URL.'), {
                        title: t('Selecting resized image failed'),
                        namespace: 'ckfinder'
                    });

                    return;
                }

                insertImages(editor, [resizedUrl]);
            });
        };
        editor.config._config.onOpen();
    }
    destroy() {
        this.stopListening();
    }
}

mix( MyFinderCommand, ObservableMixin );

function forceDisable(evt) {
    evt.return = false;
    evt.stop();
}

function insertImages(editor, urls) {
    const imageCommand = editor.commands.get('imageUpload');

    if (!imageCommand.isEnabled) {
        const notification = editor.plugins.get('Notification');
        const t = editor.locale.t;

        notification.showWarning(t('Could not insert image at the current position.'), {
            title: t('Inserting image failed'),
            namespace: 'ckfinder'
        });

        return;
    }

    editor.execute('imageInsert', {source: urls});
}
