import { Cache, Contact, Group } from '../index.js';

/**
 * `Member` 类型代表群聊成员。
 * 
 * @property { Group } #group 群聊成员来自的群聊。
 * @property { String } #uid 群聊成员的 **uid**。
 * @property { String } #cardName 群聊成员的群名片。
 * @property { String } #nick 群聊成员的昵称。
 * @property { String } #qid 群聊成员的 **qid**。
 * @property { String } #remark 群聊成员备注。
 */
class Member extends Contact {

    #group;
    #uid;
    #cardName;
    #nick;
    #qid;
    #remark;

    static {
        euphonyNative.subscribeEvent('nodeIKernelGroupListener/onMemberInfoChange', payload => {
            const group = Group.make(payload.groupCode);
            for (const [uid, nativeMember] of payload.members) {
                const member = Member.make(group, nativeMember.uin, uid);
                member.#cardName = nativeMember.cardName;
                member.#nick = nativeMember.nick;
                member.#qid = nativeMember.qid;
                member.#remark = nativeMember.remark;
            }
        });
    }

    /**
     * 返回该联系人类型所对应的 **chatType**，值为 **1**。
     * 
     * @returns { Number } 该联系人类型所对应的 **chatType**，值为 **1**。
     */
    static getChatType() { 
        return 1;
    }

    /**
     * 构造一个来自 `group` 的 **qq号** 为 `uin`，**uid** 为 `uid` 的群聊成员。
     * 
     * 该函数构造出的群聊成员全局只有一个实例，相同的 `group` `uin` `uid` 将会返回相同的对象。
     * 
     * 在一般情况下，你应该使用 `Group.getMemberFromUin(uin)` 或 `Group.getMemberFromUid(uid)` 函数来获取一个群聊成员，而不是直接构造。
     * 
     * 若有特殊需要，则应该使用该函数来构造群聊成员，而非直接使用构造器。
     * 
     * @param { Group } group 群聊成员来自的群聊。
     * @param { String } uin 群聊成员的 **qq号**。
     * @param { String } uid 群聊成员的 **uid**。
     * @returns { Member } 构造出的群聊成员。
     */
    static make(group, uin, uid) {
        return Cache.withCache(`member-${ group.getId() }-${ uin }-${ uid }`, () => new Member(group, uin, uid));
    }

    /**
     * 构造一个来自 `group` 的 **qq号** 为 `uin`，**uid** 为 `uid` 的群聊成员。
     * 
     * 注意：在任何情况下，都不应该直接使用该构造器来构造群聊成员。相反地，你应该使用 `Member.make(group, uin, uid)` 函数来构造群聊成员。
     * 
     * @param { Group } group 群聊成员来自的群聊。
     * @param { String } uin 群聊成员的 **qq号**。
     * @param { String } uid 群聊成员的 **uid**。
     */
    constructor(group, uin, uid) {
        super(uin);
        this.#group = group;
        this.#uid = uid;
    }

    /**
     * 返回该群聊成员的 `#group` 属性。
     * 
     * @returns { Group } 该群聊成员的 `#group` 属性。
     */
    getGroup() {
        return this.#group;
    }

    /**
     * 返回该群聊成员的 `#uid` 属性。
     * 
     * @returns { String } 该群聊成员的 `#uid` 属性。
     */
    getUid() {
        return this.#uid;
    }

    /**
     * 返回该群聊成员的 `#cardName` 属性。
     * 
     * @returns { String } 该群聊成员的 `#cardName` 属性。
     */
    getCardName() {
        return this.#cardName;
    }

    /**
     * 返回该群聊成员的 `#nick` 属性。
     * 
     * @returns { String } 该群聊成员的 `#nick` 属性。
     */
    getNick() {
        return this.#nick;
    }

    /**
     * 返回该群聊成员的 `#qid` 属性。
     * 
     * @returns { String } 该群聊成员的 `#qid` 属性。
     */
    getQid() {
        return this.#qid;
    }

    /**
     * 返回该群聊成员的 `#remark` 属性。
     * 
     * @returns { String } 该群聊成员的 `#remark` 属性。
     */
    getRemark() {
        return this.#remark;
    }

    /**
     * 设置该群聊成员的群名片为 `cardName`。
     * 
     * @param { String } cardName 新的群名片。
     */
    async setCardName(cardName) {
        await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelGroupService/modifyMemberCardName', false, {
            cardName,
            groupCode: this.#group.getId(),
            uid: this.#uid
        });
    }

    /**
     * 设置该群聊成员的禁言时长为 `duration`。
     * 
     * 若 `duration` 为 0，则会解除该群聊成员的禁言。
     * 
     * 实际上，该函数可以做到只禁言 **1s**，尽管在某些设备上无法显示 **1s** 的时长。
     * 
     * @param { Number } duration 禁言时长（单位：秒）。
     */
    async mute(duration) {
        await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelGroupService/setMemberShutUp', false, {
            groupCode: this.#group.getId(),
            memList: [
                {
                    timeStamp: duration,
                    uid: this.#uid
                }
            ]
        });
    }

    /**
     * 解除该群聊成员的禁言。效果等价于 `Member.mute(0)`。
     */
    async unmute() {
        await this.mute(0);
    }

    /**
     * 构造并返回该群聊成员所对应的 **peer** 对象。
     * 
     * @returns { Native } 该群聊成员所对应的 **peer** 对象。
     */
    toPeer() {
        return {
            chatType: Member.getChatType(),
            peerUid: this.#uid,
            guildId: ''
        };
    }
    
}

export default Member