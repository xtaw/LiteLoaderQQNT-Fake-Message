import { SingleMessage } from '../../index.js';

class PlainText extends SingleMessage {

    #content;

    static getElementType() {
        return 1;
    }

    constructor(content) {
        super();
        this.#content = content;
    }

    getContent() {
        return this.#content;
    }

    async toElement() {
        return {
            elementId: '',
            elementType: PlainText.getElementType(),
            textElement: {
                content: this.#content
            }
        };
    }

}

export default PlainText