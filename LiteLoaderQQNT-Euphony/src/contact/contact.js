import { SingleMessage, MessageSource, Friend, Group, MessageChain } from '../index.js';

/**
 * `Contact` 类型代表所有的联系人。
 * 
 * @property { String } #id 该联系人的标识，在 `Friend` 中表示好友的 **qq号**，在 `Group` 中表示群聊的 **群号**。
 */
class Contact {

    #id;

    /**
     * 返回当前窗口上正在进行的聊天对象。如果没有聊天对象，或聊天对象类型不受支持，则返回 `null`。
     * 
     * @returns { Contact } 当前窗口上正在进行的聊天对象。
     */
    static getCurrentContact() {
        const contact = app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Aio?.curAioData;
        const uin = contact?.header?.uin;
        const uid = contact?.header?.uid;
        if (!uin || !uid) {
            return null;
        }
        switch (contact.chatType) {
            case Friend.getChatType():
                return Friend.make(uin, uid);
            case Group.getChatType():
                return Group.make(uin);
        }
    }

    /**
     * （抽象函数，由子类实现）
     * 
     * 返回该联系人类型所对应的 **chatType**。
     * 
     * @returns { Number } 该联系人类型所对应的 **chatType**。
     */
    static getChatType() {
        throw new Error('Abstract method not implemented.');
    }

    /**
     * 仅供子类调用。
     * 
     * @param { String } id 在 `Friend` 中表示好友的 **qq号**，在 `Group` 中表示群聊的 **群号**。
     */
    constructor(id) {
        this.#id = id;
    }

    /**
     * 向该联系人发送一条消息，并返回其在服务器上的来源。
     * 
     * @param { MessageChain | SingleMessage } message 消息内容。
     * @param { String } msgId 消息的 **msgId**，如果此参数为空则会随机生成。
     * @returns { MessageSource } 发送的信息在服务器上的来源。
     */
    async sendMessage(message, msgId = undefined) {
        if (!msgId) {
            msgId = `7${ Array.from({ length: 18 }, () => Math.floor(Math.random() * 10)).join('') }`;
        }
        await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelMsgService/sendMsg', false, {
            msgId,
            peer: this.toPeer(),
            msgElements: message instanceof SingleMessage ? [ await message.toElement() ] : await message.toElements(),
            msgAttributeInfos: new Map()
        });
        return new MessageSource(msgId, this);
    }

    /**
     * 返回该联系人的 `#id` 属性。
     * 
     * @returns { String } 该联系人的 `#id` 属性。
     */
    getId() {
        return this.#id;
    }

    /**
     * （抽象函数，由子类实现）
     * 
     * 构造并返回该联系人所对应的 **peer** 对象。
     * 
     * @returns { Native } 该联系人所对应的 **peer** 对象。
     */
    toPeer() {
        throw new Error('Abstract method not implemented.');
    }

}

export default Contact