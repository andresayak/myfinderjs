/**
 * @module andresayak/myfinderui
 */

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './../theme/icons/image.svg';

export default class MyFinderUI{
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MyFinderUI';
    }

    constructor(editor) {
        this.editor = editor;
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
                icon: imageIcon,
                tooltip: true
            });
            button.bind('isEnabled').to(command);

            return button;
        });
    }
}
