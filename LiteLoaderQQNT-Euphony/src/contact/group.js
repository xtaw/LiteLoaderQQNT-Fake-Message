import { Cache, Contact, Member } from '../index.js';

/**
 * `Group` 类型代表群聊。
 */
class Group extends Contact {

    /**
     * 返回该联系人类型所对应的 **chatType**，值为 **2**。
     * 
     * @returns { Number } 该联系人类型所对应的 **chatType**，值为 **2**。
     */
    static getChatType() {
        return 2;
    }

    /**
     * 构造一个 **群号** 为 `id` 的群聊。
     * 
     * 该函数构造出的群聊全局只有一个实例，相同的 `id` 将会返回相同的对象。
     * 
     * 在任何情况下，都应该使用该函数来构造群聊，而非直接使用构造器。
     * 
     * @param { String } id 群聊的 **群号**。
     * @returns { Group } 构造出的群聊。
     */
    static make(id) {
        return Cache.withCache(`group-${ id }`, () => new Group(id));
    }

    /**
     * 构造一个 **群号** 为 `id` 的群聊。
     * 
     * 注意：在任何情况下，都不应该直接使用该构造器来构造群聊。相反地，你应该使用 `Group.make(id)` 函数来构造群聊。
     * 
     * @param { String } id 群聊的 **群号**。
     */
    constructor(id) {
        super(id);
    }

    /**
     * 获取并返回该群聊在原生qq中的对象。
     * 
     * @returns { Native } 原生群聊对象。
     */
    getNative() {
        const groupMap = app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Contact_group?.groupMap;
        if (!groupMap) {
            return null;
        }
        return groupMap[this.getId()];
    }

    /**
     * 获取并返回该群聊的群聊名称。
     * 
     * @returns { String } 群聊名称。
     */
    getName() {
        return this.getNative()?.groupName;
    }

    /**
     * 获取并返回该群聊的群聊最大人数。
     * 
     * @returns { Number } 群聊最大人数。
     */
    getMaxMemberCount() {
        return this.getNative()?.maxMember;
    }

    /**
     * 获取并返回该群聊的群聊人数。
     * 
     * @returns { Number } 群聊人数。
     */
    getMemberCount() {
        return this.getNative()?.memberCount;
    }

    /**
     * 获取并返回该群聊的群聊备注。
     * 
     * @returns { String } 群聊备注。
     */
    getRemark() {
        return this.getNative()?.remarkName;
    }

    /**
     * 通过 **qq号** 获取该群聊的某个成员。
     * 
     * 若不存在，则会返回 `null`。
     * 
     * @param { String } uin 成员的 **qq号**。
     * @returns { Member } 获取到的成员。
     */
    getMemberFromUin(uin) {
        const uid = euphonyNative.convertUinToUid(uin);
        if (!uid) {
            return null;
        }
        return Member.make(this, uin, uid);
    }

    /**
     * 通过 **uid** 获取该群聊的某个成员。
     * 
     * 若不存在，则会返回 `null`。
     * 
     * @param { String } uid 成员的 **uid**。
     * @returns { Member } 获取到的成员。
     */
    getMemberFromUid(uid) {
        const uin = euphonyNative.convertUidToUin(uid);
        if (!uin) {
            return null;
        }
        return Member.make(this, uin, uid);
    }
    
    /**
     * 获取该群聊的所有成员。
     * 
     * @returns { Array<Member> } 该群聊的所有成员。
     */
    async getMembers() {
        const sceneId = await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelGroupService/createMemberListScene', false, {
            groupCode: this.getId(),
            scene: 'groupMemberList_MainWindow'
        });
        const members = await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelGroupService/getNextMemberList', false, {
            sceneId,
            num: this.getMemberCount()
        });
        const result = [];
        for (const [uid, nativeMember] of members.result.infos) {
            result.push(Member.make(this, nativeMember.uin, uid));
        }
        return result;
    }

    /**
     * 构造并返回该群聊所对应的 **peer** 对象。
     * 
     * @returns { Native } 该群聊所对应的 **peer** 对象。
     */
    toPeer() {
        return {
            chatType: Group.getChatType(),
            peerUid: this.getId(),
            guildId: ''
        };
    }

}

export default Group