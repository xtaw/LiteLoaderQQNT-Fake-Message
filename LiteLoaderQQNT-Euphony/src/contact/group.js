import { Contact } from '../index.js';

class Group extends Contact {

    static getChatType() {
        return 2;
    }

    constructor(id) {
        super(String(id));
    }

    toPeer() {
        return {
            chatType: Group.getChatType(),
            peerUid: this.getId(),
            guildId: ''
        };
    }

}

export default Group