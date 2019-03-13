export default class plugin {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        this.editor = editor;
    }

    /**
     * @inheritDoc
     */
    destroy() {
        this.stopListening();
    }
}
