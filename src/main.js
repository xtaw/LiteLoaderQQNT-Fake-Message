const { ipcMain } = require("electron");

ipcMain.handle('LiteLoader.fake_message.buildForwardMessage', async (event, messages) => {
    return (await fetch('http://api.xn--7gqa009h.top/api/wzlt', {
        'headers': {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        'body': `sz=${ messages }`,
        'method': 'POST'
    })).text();
});