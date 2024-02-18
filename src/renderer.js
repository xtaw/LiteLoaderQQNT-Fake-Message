document.body.insertAdjacentHTML('afterbegin', await (await fetch(`local:///${ LiteLoader.plugins.fake_message.path.plugin }/src/ui/create_window.html`)).text());
const fakeMessageWindow = document.getElementById('fake-message-window');
const fakeMessageModal = document.getElementById('fake-message-modal');
const fakeMessageDialog = document.getElementById('fake-message-dialog');
fakeMessageModal.addEventListener('click', () => {
    fakeMessageWindow.style.visibility = 'hidden';
    fakeMessageModal.style.transitionDelay = '150ms';
    fakeMessageDialog.style.transitionDelay = '0ms';
    fakeMessageModal.style.opacity = 0;
    fakeMessageDialog.style.opacity = 0;
    fakeMessageDialog.style.transform = 'translate(0px, -20px)';
});

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            const nodes = Array.from(mutation.addedNodes);
            nodes.forEach(async node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('chat-func-bar')) {
                    const funcBar = node.getElementsByTagName('div')[0];
                    const openButton = funcBar.lastElementChild.cloneNode(true);
                    const icon = openButton.getElementsByTagName('i')[0];
                    icon.innerHTML = await (await fetch(`local:///${ LiteLoader.plugins.fake_message.path.plugin }/src/assets/svg/open_button.svg`)).text();
                    openButton.addEventListener('click', () => {
                        fakeMessageWindow.style.visibility = 'visible';
                        fakeMessageModal.style.transitionDelay = '0ms';
                        fakeMessageDialog.style.transitionDelay = '150ms';
                        fakeMessageModal.style.opacity = 1;
                        fakeMessageDialog.style.opacity = 1;
                        fakeMessageDialog.style.transform = 'translate(0px, 0px)';
                    });
                    funcBar.appendChild(openButton);
                }
            });
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true });