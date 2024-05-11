import { Friend, Group } from '../index.js';

/**
 * `Client` 类型代表自身客户端。
 */
class Client {

    /**
     * 获取客户端登录账号的 **qq号**。
     * 
     * @returns { String } 客户端登录账号的 **qq号**。
     */
    static getUin() {
        return app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Auth?.authData?.uin;
    }

    /**
     * 获取客户端登录账号的 **uid**。
     * 
     * @returns { String } 客户端登录账号的 **uid**。 
     */
    static getUid() {
        return app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Auth?.authData?.uid;
    }

    /**
     * 获取客户端好友列表。
     * 
     * @returns { Array<Friend> } 客户端好友列表。
     */
    static getFriends() {
        const buddyMap = app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Contact_buddy?.buddyMap;
        if (!buddyMap) {
            return null;
        }
        const result = [];
        for (const uid in buddyMap) {
            result.push(Friend.make(buddyMap[uid].uin, uid));
        }
        return result;
    }

    /**
     * 获取客户端群列表。
     * 
     * @returns { Array<Group> } 客户端群列表。
     */
    static getGroups() {
        const groupList = app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Contact_group?.groupList;
        if (!groupList) {
            return null;
        }
        const result = [];
        for (const nativeGroup of groupList) {
            result.push(Group.make(nativeGroup.groupCode));
        }
        return result;
    }

}

export default Client