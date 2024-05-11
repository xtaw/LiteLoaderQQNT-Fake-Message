import { SingleMessage } from '../../index.js';

/**
 * `PlainText` 类型代表一个纯文本消息元素。
 * 
 * @property { String } #content 消息内容。
 */
class PlainText extends SingleMessage {

    #content;

    /**
     * 返回该消息元素所对应的 **elementType**，值为 **1**。
     * 
     * @returns { Number } 该消息元素所对应的 **elementType**，值为 **1**。
     */
    static getElementType() {
        return 1;
    }

    /**
     * 构造一个内容为 `content` 的纯文本消息。
     * 
     * @param { String } content 消息内容。
     */
    constructor(content) {
        super();
        this.#content = content;
    }

    /**
     * 返回该消息元素的 `#content` 属性。
     * 
     * @returns { String } 该消息元素的 `#content` 属性。
     */
    getContent() {
        return this.#content;
    }

    /**
     * 构造并返回该消息元素所对应的 **element** 对象。
     * 
     * @returns { Native } 该消息元素所对应的 **element** 对象。
     */
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