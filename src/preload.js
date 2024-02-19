const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fake_message", {
    buildForwardMessage: messages => ipcRenderer.invoke(
        'LiteLoader.fake_message.buildForwardMessage',
        messages
    )
});
