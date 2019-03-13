/**
 * @module andresayak/myfinderui
 */

import Plugin from './plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import browseFilesIcon from './../theme/icons/browse-files.svg';

/**
 * The CKFinder UI plugin. It introduces he `'ckfinder'` toolbar button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class MyFinderUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MyFinderUI';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;
        const t = editor.t;

        componentFactory.add('myfinder', locale => {
            const command = editor.commands.get('myfinder');

            const button = new ButtonView(locale);
            button.on('execute', () => {
                editor.execute('myfinder');
                editor.editing.view.focus();
            });
            button.set({
                label: t('Insert image or file'),
                icon: browseFilesIcon,
                tooltip: true
            });
            button.bind('isEnabled').to(command);

            return button;
        });
    }
}
