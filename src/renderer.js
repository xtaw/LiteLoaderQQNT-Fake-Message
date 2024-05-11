import { createApp, ref } from './lib/vue.js';

import { Contact, Raw, ChatFuncBar } from '../LiteLoaderQQNT-Euphony/src/index.js';

document.body.insertAdjacentHTML('afterbegin', await (await fetch(`local:///${ LiteLoader.plugins['fake_message'].path.plugin }/src/ui/create_window.html`)).text());
const fakeMessageWindow = document.getElementById('fake-message-window');
const fakeMessageModal = document.getElementById('fake-message-modal');
const fakeMessageDialog = document.getElementById('fake-message-dialog');

function hideWindow() {
    fakeMessageWindow.style.visibility = 'hidden';
    fakeMessageModal.style.transitionDelay = '150ms';
    fakeMessageDialog.style.transitionDelay = '0ms';
    fakeMessageModal.style.opacity = 0;
    fakeMessageDialog.style.opacity = 0;
    fakeMessageDialog.style.transform = 'translate(0px, -20px)';
}

fakeMessageModal.addEventListener('click', hideWindow);

const app = createApp({
    setup() {
        const isDarkMode = ref(document.body.getAttribute('q-theme') == 'dark');

        const messages = ref([]);
        const selectedMessage = ref(-1);
        const inputUin = ref('');
        const inputName = ref('');
        const inputContent = ref('');

        function addMessage() {
			if (inputUin.value.length == 0 || inputContent.value.length == 0) {
                return;
            }
            messages.value.push({
                uin: String(inputUin.value),
                name: inputName.value.length == 0 ? inputUin.value : inputName.value,
                content: inputContent.value
            });
		}
        
        function removeMessage() {
            if (selectedMessage.value != -1 && messages.value.length > selectedMessage.value) {
                messages.value.splice(selectedMessage.value, 1);
                selectedMessage.value = -1;
            }
        }

        async function sendMessage() {
            if (messages.value.length > 0) {
                fake_message.buildForwardMessage(JSON.stringify(messages.value)).then(async bytesData => {
                    if (bytesData) {
                        Contact.getCurrentContact().sendMessage(new Raw({
                            elementId: '',
                            elementType: 10,
                            arkElement: {
                                bytesData: bytesData
                            }
                        }));
                    }
                });
                hideWindow();
            }
        }

        return {
            isDarkMode, messages, selectedMessage, inputUin, inputName, inputContent, addMessage, removeMessage, sendMessage
        }
    }
}).mount('#fake-message-dialog');

ChatFuncBar.addLeftButton(await (await fetch(`local:///${ LiteLoader.plugins['fake_message'].path.plugin }/src/assets/svg/open_button.svg`)).text(), () => {
    fakeMessageWindow.style.visibility = 'visible';
    fakeMessageModal.style.transitionDelay = '0ms';
    fakeMessageDialog.style.transitionDelay = '150ms';
    fakeMessageModal.style.opacity = 1;
    fakeMessageDialog.style.opacity = 1;
    fakeMessageDialog.style.transform = 'translate(0px, 0px)';
});

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type == 'attributes' && mutation.attributeName == 'q-theme') {
            app.isDarkMode = document.body.getAttribute('q-theme') == 'dark';
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true, attributes: true });