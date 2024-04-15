import { Friend, Group, MessageChain, MessageSource } from '../index.js';

class EventChannel {

    #registry = new Map();

    static fromNative() {
        const eventChannel = new EventChannel();

        function onReceiveMessage(payload) {
            const msg = payload?.msgList?.[0];
            if (!msg) {
                return;
            }
            const contact = msg.chatType == 1 ? new Friend(msg.peerUin, msg.peerUid) : (msg.chatType == 2 ? new Group(msg.peerUin) : null);
            const source = new MessageSource(msg.msgId, contact);
            const messageChain = new MessageChain(source);
            messageChain.appendNatives(msg.elements);
            eventChannel.call('receive-message', messageChain);
        }

        euphonyNative.subscribeEvent('nodeIKernelMsgListener/onRecvMsg', onReceiveMessage);
        euphonyNative.subscribeEvent('nodeIKernelMsgListener/onRecvActiveMsg', onReceiveMessage);
        euphonyNative.subscribeEvent('nodeIKernelMsgListener/onAddSendMsg', payload => {
            const msgRecord = payload?.msgRecord;
            if (!msgRecord) {
                return;
            }
            const contact = msgRecord.chatType == 1 ? new Friend(msgRecord.peerUin, msgRecord.peerUid) : (msgRecord.chatType == 2 ? new Group(msgRecord.peerUin) : null);
            const source = new MessageSource(msgRecord.msgId, contact);
            const messageChain = new MessageChain(source);
            messageChain.appendNatives(msgRecord.elements);
            eventChannel.call('send-message', messageChain);
        });
        return eventChannel;
    }

    subscribeEvent(eventName, handler) {
        if (!this.#registry.has(eventName)) {
            this.#registry.set(eventName, []);
        }
        this.#registry.get(eventName).push(handler);
        return handler;
    }

    unsubscribeEvent(eventName, handler) {
        const event = this.#registry.get(eventName);
        if (event) {
            const index = event.indexOf(handler);
            if (index != -1) {
                event.splice(index, 1);
            }
        }
    }

    call(eventName, ...args) {
        this.#registry.get(eventName)?.forEach(handler => handler(...args));
    }

}

export default EventChannel