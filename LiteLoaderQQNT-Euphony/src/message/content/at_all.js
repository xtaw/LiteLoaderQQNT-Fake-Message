import { SingleMessage } from '../../index.js';

class AtAll extends SingleMessage {

    #content;

    static getElementType() {
        return 1;
    }

    constructor(content = '@全体成员') {
        super();
        this.#content = content;
    }

    getContent() {
        return this.#content;
    }

    async toElement() {
        return {
            elementId: '',
            elementType: AtAll.getElementType(),
            textElement: {
                atType: 1,
                atNtUid: 'all',
                content: this.#content
            }
        };
    }

}

export default AtAll