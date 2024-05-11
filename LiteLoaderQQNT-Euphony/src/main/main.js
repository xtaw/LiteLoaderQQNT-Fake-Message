exports.onBrowserWindowCreated = window => {
    window.webContents.on('ipc-message-sync', (event, channel) => {
        if (channel == '___!boot') {
            event.returnValue = {
                enabled: true,
                webContentsId: window.webContents.id.toString(),
            };
        }
    });
}