import { SingleMessage, MessageSource, Friend, Group } from '../index.js';

class Contact {

    #id;

    static getCurrentContact() {
        const contact = app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Aio?.curAioData;
        const uin = contact?.header?.uin;
        const uid = contact?.header?.uid;
        if (!uin || !uid) {
            return null;
        }
        switch (contact.chatType) {
            case Friend.getChatType():
                return new Friend(uin, uid);
            case Group.getChatType():
                return new Group(uin);
        }
    }

    static getChatType() {
        throw new Error('Abstract method not implemented.');
    }

    constructor(id) {
        this.#id = id;
    }

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

    getId() {
        return this.#id;
    }

    toPeer() {
        throw new Error('Abstract method not implemented.');
    }

}

export default Contact