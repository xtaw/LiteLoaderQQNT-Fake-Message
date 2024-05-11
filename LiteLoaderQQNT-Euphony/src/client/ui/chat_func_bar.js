/**
 * `ChatFuncBar` 类型代表客户端聊天窗口输入框上方工具栏。
 */
class ChatFuncBar {

    /**
     * 向聊天窗口输入框上方工具栏左侧添加一个按钮。
     * 
     * @param { String } icon 按钮图标。
     * @param { Function } onClick 点击事件。
     */
    static addLeftButton(icon, onClick) {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    const nodes = Array.from(mutation.addedNodes);
                    nodes.forEach(async node => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('chat-func-bar')) {
                            const chatFuncBarLeft = node.firstElementChild;
                            chatFuncBarLeft.insertAdjacentHTML('beforeend', await (await fetch(`local:///${ LiteLoader.plugins['euphony'].path.plugin }/src/assets/html/chat_func_bar_button.html`)).text());
                            const button = chatFuncBarLeft.lastElementChild;
                            const buttonIcon = button.firstElementChild;
                            buttonIcon.innerHTML = icon;
                            button.addEventListener('click', onClick);
                        }
                    });
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    /**
     * 向聊天窗口输入框上方工具栏右侧添加一个按钮。
     * 
     * @param { String } icon 按钮图标。
     * @param { Function } onClick 点击事件。
     */
    static addRightButton(icon, onClick) {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    const nodes = Array.from(mutation.addedNodes);
                    nodes.forEach(async node => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('chat-func-bar')) {
                            const chatFuncBarRight = node.lastElementChild;
                            console.log(chatFuncBarRight)
                            chatFuncBarRight.insertAdjacentHTML('beforeend', await (await fetch(`local:///${ LiteLoader.plugins['euphony'].path.plugin }/src/assets/html/chat_func_bar_button.html`)).text());
                            const button = chatFuncBarRight.lastElementChild;
                            const buttonIcon = button.firstElementChild;
                            buttonIcon.innerHTML = icon;
                            button.addEventListener('click', onClick);
                        }
                    });
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

}

export default ChatFuncBar