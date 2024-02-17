const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("fake_message", {

});
