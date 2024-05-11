import { SingleMessage } from '../../index.js';

/**
 * `At` 类型代表一个 **@群聊成员** 消息元素。
 * 
 * @property { String } #uin 群聊成员的 **qq号**。
 * @property { String } #uid 群聊成员的 **uid**。
 */
class At extends SingleMessage {

    #uin;
    #uid;

    /**
     * 返回该消息元素所对应的 **elementType**，值为 **1**。
     * 
     * @returns { Number } 该消息元素所对应的 **elementType**，值为 **1**。
     */
    static getElementType() {
        return 1;
    }

    /**
     * 通过 **qq号** 来构造一个 **@群聊成员** 元素。
     * 
     * 若不存在，则会返回 `null`。
     * 
     * @param { String } uin 群聊成员的 **qq号**。
     * @returns { At } 构造出的消息元素。
     */
    static fromUin(uin) {
        const uid = euphonyNative.convertUinToUid(uin);
        if (!uid) {
            return null;
        }
        return new At(uin, uid);
    }

    /**
     * 通过 **uid** 来构造一个 **@群聊成员** 元素。
     * 
     * 若不存在，则会返回 `null`。
     * 
     * @param { String } uid 群聊成员的 **uid**。
     * @returns { At } 构造出的消息元素。
     */
    static fromUid(uid) {
        const uin = euphonyNative.convertUidToUin(uid);
        if (!uin) {
            return null;
        }
        return new At(uin, uid);
    }

    /**
     * 构造一个 **qq号** 为 `uin`，**uid** 为 `uid` 的 **@群聊成员** 消息元素。
     * 
     * @param { String } uin 群聊成员的 **uin**。
     * @param { String } uid 群聊成员的 **uid**。
     */
    constructor(uin, uid) {
        super();
        this.#uin = uin;
        this.#uid = uid;
    }

    /**
     * 返回该消息元素的 `#uin` 属性。
     * 
     * @returns { String } 该消息元素的 `#uin` 属性。
     */
    getUin() {
        return this.#uin;
    }

    /**
     * 返回该消息元素的 `#uid` 属性。
     * 
     * @returns { String } 该消息元素的 `#uid` 属性。
     */
    getUid() {
        return this.#uid;
    }

    /**
     * 构造并返回该消息元素所对应的 **element** 对象。
     * 
     * @returns { Native } 该消息元素所对应的 **element** 对象。
     */
    async toElement() {
        return {
            elementId: '',
            elementType: At.getElementType(),
            textElement: {
                atType: 2,
                atUid: this.#uin,
                atNtUid: this.#uid
            }
        };
    }

}

export default At