import { SingleMessage } from "../../index.js";

class Raw extends SingleMessage {

    #element;

    constructor(element) {
        super();
        this.#element = element;
    }

    getElement() {
        return this.#element;
    }

    async toElement() {
        return this.#element;
    }

}

export default Raw