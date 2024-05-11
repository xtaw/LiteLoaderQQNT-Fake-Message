import { SingleMessage } from '../../index.js';

/**
 * `AtAll` 类型代表一个 **@全体成员** 消息元素。
 * 
 * @property { String } #content 显示内容。
 */
class AtAll extends SingleMessage {

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
     * 构造一个显示为 `content` 的 **@全体成员** 消息元素。
     * 
     * @param { String } content 显示内容。
     */
    constructor(content = '@全体成员') {
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