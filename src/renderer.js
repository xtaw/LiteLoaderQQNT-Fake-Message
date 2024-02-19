const { createApp, ref } = await import('./lib/vue.js');

document.body.insertAdjacentHTML('afterbegin', await (await fetch(`local:///${ LiteLoader.plugins['fake_message'].path.plugin }/src/ui/create_window.html`)).text());
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

const app = createApp({
    setup() {
        const messages = ref([]);
        const selectedMessage = ref(-1);
        const inputQQ = ref('');
        const inputTime = ref('');
        const inputContent = ref('');

        function addMessage() {
			if (inputQQ.value.length == 0 || inputTime.value.length == 0 || inputContent.value.length == 0) {
                return;
            }
            messages.value.push({
                qq: inputQQ.value,
                time: inputTime.value,
                content: inputContent.value
            });
		}
        
        function removeMessage() {
            if (selectedMessage.value != -1 && messages.value.length > selectedMessage.value) {
                messages.value.splice(selectedMessage.value, 1);
                selectedMessage.value = -1;
            }
        }

        return {
            messages, selectedMessage, inputQQ, inputTime, inputContent, addMessage, removeMessage
        }
    }
}).mount("#fake-message-dialog");

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            const nodes = Array.from(mutation.addedNodes);
            nodes.forEach(async node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('chat-func-bar')) {
                    const funcBar = node.getElementsByTagName('div')[0];
                    const openButton = funcBar.lastElementChild.cloneNode(true);
                    const icon = openButton.getElementsByTagName('i')[0];
                    icon.innerHTML = await (await fetch(`local:///${ LiteLoader.plugins['fake_message'].path.plugin }/src/assets/svg/open_button.svg`)).text();
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