import { SingleMessage } from '../index.js';

class MessageChain {

    #source;

    #messages = [];

    constructor(source = undefined) {
        this.#source = source;
    }

    getSource() {
        return this.#source;
    }

    append(value) {
        this.#messages.push(value);
        return this;
    }

    appendNative(element) {
        this.#messages.push(SingleMessage.fromNative(element));
    }

    appendNatives(elements) {
        for (const element of elements) {
            this.appendNative(element);
        }
    }

    pop() {
        this.#messages.pop();
        return this;
    }

    remove(index) {
        this.#messages.splice(index, 1);
        return this;
    }

    async toElements() {
        return await Promise.all(this.#messages.map(async message => await message.toElement()));
    }

}

export default MessageChain