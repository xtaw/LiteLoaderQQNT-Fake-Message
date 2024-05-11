/**
 * `MessageSource` 类型代表一条消息的来源。
 * 
 * @property { String } #msgId 该消息来源的 **msgId**。
 * @property { Contact } #contact 该消息来源的联系人。
 */
class MessageSource {

    #msgId;

    #contact;

    /**
     * 通过 **msgId** 和联系人构造一个消息来源。
     * 
     * @param { String } msgId 消息的 **msgId**。
     * @param { Contact } contact 来源联系人。
     */
    constructor(msgId, contact) {
        this.#msgId = msgId;
        this.#contact = contact;
    }

    /**
     * 返回该消息来源的 `#msgId` 属性。
     * 
     * @returns { String } 该消息来源的 `#msgId` 属性。
     */
    getMsgId() {
        return this.#msgId;
    }

    /**
     * 返回该消息来源的 `#contact` 属性。
     * 
     * @returns { Contact } 该消息来源的 `#contact` 属性。
     */
    getContact() {
        return this.#contact;
    }

    /**
     * 撤回该消息来源所代表的消息。
     */
    async recall() {
        await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelMsgService/recallMsg', false, {
            msgIds: [
                this.#msgId
            ],
            peer: this.#contact.toPeer()
        });
    }

}

export default MessageSource