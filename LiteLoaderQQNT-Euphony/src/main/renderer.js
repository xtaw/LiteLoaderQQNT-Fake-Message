import { Contact, Friend, Group, Member, SingleMessage, MessageChain, MessageSource, PlainText, Image, Audio, At, AtAll, Raw, EventChannel, Client, Cache, ChatFuncBar } from '../index.js';

const chatFuncBarCss = document.createElement('link');
chatFuncBarCss.rel = 'stylesheet';
chatFuncBarCss.href = `local:///${ LiteLoader.plugins['euphony'].path.plugin }/src/assets/css/chat_func_bar.css`;
document.head.appendChild(chatFuncBarCss);

Object.defineProperty(window, 'euphony', {
    value: {
        Contact,
        Friend,
        Group,
        Member,
        SingleMessage,
        MessageChain,
        MessageSource,
        PlainText,
        Image,
        Audio,
        At,
        AtAll,
        Raw,
        EventChannel,
        Client,
        Cache,
        ChatFuncBar
    },
    writable: false
});