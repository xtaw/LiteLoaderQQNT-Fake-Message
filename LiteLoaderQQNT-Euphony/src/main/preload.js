const { contextBridge, ipcRenderer } = require('electron');

const uinToUidMap = new Map();
const uidToUinMap = new Map();

function invokeNative(eventName, cmdName, registered, ...args) {
    return new Promise(resolve => {
        const callbackId = crypto.randomUUID();
        const callback = (event, ...args) => {
            if (args?.[0]?.callbackId == callbackId) {
                ipcRenderer.off('IPC_DOWN_2', callback);
                resolve(args[1]);
            }
        };
        ipcRenderer.on('IPC_DOWN_2', callback);
        ipcRenderer.send('IPC_UP_2', {
            type: 'request',
            callbackId,
            eventName: `${ eventName }-2${ registered ? '-register' : '' }`
        }, [ cmdName, ...args ]);
    });
} 

function subscribeEvent(cmdName, handler) {
    const listener = (event, ...args) => {
        if (args?.[1]?.[0]?.cmdName == cmdName) {
            handler(args[1][0].payload);
        }
    };
    ipcRenderer.on('IPC_DOWN_2', listener);
    return listener;
}

contextBridge.exposeInMainWorld('euphonyNative', {
    invokeNative,
    subscribeEvent,
    unsubscribeEvent: listener => ipcRenderer.off('IPC_DOWN_2', listener),
    convertUinToUid: uin => uinToUidMap.get(String(uin)),
    convertUidToUin: uid => uidToUinMap.get(uid)
});

subscribeEvent('onBuddyListChange', payload => {
    for (const category of payload.data) {
        for (const friend of category.buddyList) {
            uinToUidMap.set(friend.uin, friend.uid);
            uidToUinMap.set(friend.uid, friend.uin);
        }
    }
});
invokeNative('ns-ntApi', 'nodeIKernelBuddyService/getBuddyList', false, { force_update: true });