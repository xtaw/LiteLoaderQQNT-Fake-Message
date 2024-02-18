const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fake_message", {
});
