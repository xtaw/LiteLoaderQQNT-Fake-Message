import { SingleMessage } from "../../index.js";

/**
 * `Raw` 类型代表一个原生消息元素，所有暂不受支持的消息类型均会被处理为该类型。
 * 
 * @property { Native } #element 原生消息元素。
 */
class Raw extends SingleMessage {

    #element;

    /**
     * 构造一个代表 `element` 的原生消息元素。
     * 
     * @param { Native } element 原生消息元素。
     */
    constructor(element) {
        super();
        this.#element = element;
    }

    /**
     * 返回该消息元素的 `#element` 属性。
     * 
     * @returns { Native } 该消息元素的 `#element` 属性。
     */
    getElement() {
        return this.#element;
    }

    /**
     * 返回该消息元素所对应的 **element** 对象。
     * 
     * @returns { Native } 该消息元素所对应的 **element** 对象。
     */
    async toElement() {
        return this.#element;
    }

}

export default Raw