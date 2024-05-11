import { At, AtAll, Audio, Image, PlainText, SingleMessage } from '../index.js';

/**
 * `MessageChain` 类型代表一条完整的消息，由多个 `SingleMessage` 组成。
 * 
 * @property { Array } #messages 构成该消息链的所有元素。接收的类型应为 `SingleMessage`。
 */
class MessageChain {

    #messages = [];

    /**
     * 从原生消息链构造出一个 `MessageChain` 对象。
     * 
     * @param { Native } elements 原生消息链。
     * @returns { MessageChain } 原生消息链所对应的 `MessageChain` 对象。
     */
    static fromNative(elements) {
        const result = new MessageChain();
        for (const element of elements) {
            result.append(SingleMessage.fromNative(element));
        }
        return result;
    }

    /**
     * 将一个消息元素添加至该消息链中。
     * 
     * @param { SingleMessage } value 要添加的消息元素。
     * @returns { MessageChain } 该消息链。
     */
    append(value) {
        this.#messages.push(value);
        return this;
    }

    /**
     * 移除该消息链中最后一个消息元素。
     * 
     * @returns { MessageChain } 该消息链。 
     */
    pop() {
        this.#messages.pop();
        return this;
    }

    /**
     * 移除该消息链中指定位置的消息元素。
     * 
     * @param { Number } index 要移除的消息元素的位置。
     * @returns { MessageChain } 该消息链。
     */
    remove(index) {
        this.#messages.splice(index, 1);
        return this;
    }

    /**
     * 获取该消息链中指定位置的消息元素。
     * 
     * @param { Number } index 要获取的消息元素的位置。
     * @returns { SingleMessage } 获取到的消息元素。
     */
    get(index) {
        return this.#messages[index];
    }

    /**
     * 将该消息链转化为与qq原生显示一致的字符串形式。
     * 
     * 例如：
     * 
     * `Image` 将会被视为 "[图片]"。
     * 
     * `Audio` 将会被视为 "[语音]"。
     * 
     * 但由于 `At` 类型不包括群信息，目前 `At` 只会被视为 "**@qq号**" 的形式。
     * 
     * @returns { String } 转化后的字符串。
     */
    contentToString() {
        const result = [];
        for (const message of this.#messages) {
            if (message instanceof PlainText) {
                result.push(message.getContent());
            } else if (message instanceof At) {
                result.push(`@${ message.getUin() }`);
            } else if (message instanceof AtAll) {
                result.push(message.getContent());
            } else if (message instanceof Image) {
                result.push('[图片]');
            } else if (message instanceof Audio) {
                result.push('[语音]');
            }
        }
        return result.join('');
    }

    /**
     * 构造并返回该消息链所对应的 **elements** 对象。
     * 
     * @returns { Native } 该消息链所对应的 **elements** 对象。
     */
    async toElements() {
        return await Promise.all(this.#messages.map(async message => await message.toElement()));
    }

}

export default MessageChain