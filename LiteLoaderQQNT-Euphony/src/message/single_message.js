import { At, AtAll, PlainText, Image, Audio, Raw } from '../index.js';

/**
 * `SingleMessage` 类型代表一个消息元素。
 */
class SingleMessage {

    /**
     * 从原生消息元素构造出一个 `SingleMessage` 对象。
     * 
     * @param { Native } element 原生消息元素。
     * @returns { SingleMessage } 原生消息元素所对应的 `SingleMessage` 对象。
     */
    static fromNative(element) {
        switch (element?.elementType) {
            case PlainText.getElementType():
            case At.getElementType():
            case AtAll.getElementType():
                const textElement = element?.textElement;
                switch (textElement?.atType) {
                    case 0:
                        return new PlainText(textElement?.content);
                    case 1:
                        return new AtAll(textElement?.content);
                    case 2:
                        return new At(textElement?.atUid, textElement?.atNtUid);
                }
                break;
            case Image.getElementType():
                return new Image(element?.picElement?.sourcePath);
            case Audio.getElementType():
                const pttElement = element?.pttElement;
                return new Audio(pttElement?.filePath, pttElement?.duration);
        }
        return new Raw(element);
    }

    /**
     * （抽象函数，由子类实现）
     * 
     * 返回该消息元素所对应的 **elementType**。
     * 
     * 特别地， `Raw` 类型并不含有该静态函数。
     * 
     * @returns { Number } 该消息元素所对应的 **elementType**。
     */
    static getElementType() {
        throw new Error('Abstract method not implemented.');
    }

    /**
     * （抽象函数，由子类实现）
     * 
     * 构造并返回该消息元素所对应的 **element** 对象。
     * 
     * @returns { Native } 该消息元素所对应的 **element** 对象。
     */
    async toElement() {
        throw new Error('Abstract method not implemented.');
    }

}

export default SingleMessage