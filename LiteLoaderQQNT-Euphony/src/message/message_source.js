class MessageSource {

    #msgId;

    #contact;

    constructor(msgId, contact) {
        this.#msgId = String(msgId);
        this.#contact = contact;
    }

    getMsgId() {
        return this.#msgId;
    }

    getContact() {
        return this.#contact;
    }

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