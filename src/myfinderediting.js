/**
 * @module andresayak/myfinderediting
 */

import Plugin from './plugin';
//import Notification from '@ckeditor/ckeditor5-ui/src/notification/notification';
import MyFinderCommand from './myfindercommand';

/**
 * @extends module:core/plugin~Plugin
 */
export default class MyFinderEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'MyFinderEditing';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [];//[Notification];
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        editor.commands.add('myfinder', new MyFinderCommand(editor));
    }
}
