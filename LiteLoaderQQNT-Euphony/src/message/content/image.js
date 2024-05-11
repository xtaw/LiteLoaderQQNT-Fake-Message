import { SingleMessage } from '../../index.js';

/**
 * `Image` 类型代表一个图片消息元素。
 * 
 * @property { String } #path 图片路径。
 */
class Image extends SingleMessage {

    #path;

    /**
     * 返回该消息元素所对应的 **elementType**，值为 **2**。
     * 
     * @returns { Number } 该消息元素所对应的 **elementType**，值为 **2**。
     */
    static getElementType() {
        return 2;
    }

    /**
     * 构造一个路径为 `path` 的图片消息元素。
     * 
     * @param { String } path 图片路径。
     */
    constructor(path) {
        super();
        this.#path = path;
    }

    /**
     * 返回该消息元素的 `#path` 属性。
     * 
     * @returns { String } 该消息元素的 `#path` 属性。
     */
    getPath() {
        return this.#path;
    }

    /**
     * 构造并返回该消息元素所对应的 **element** 对象。
     * 
     * @returns { Native } 该消息元素所对应的 **element** 对象。
     */
    async toElement() {
        const fileMd5 = await euphonyNative.invokeNative('ns-FsApi', 'getFileMd5', false, this.#path);
        const imageSize = await euphonyNative.invokeNative('ns-FsApi', 'getImageSizeFromPath', false, this.#path);
        const fileSize = await euphonyNative.invokeNative('ns-FsApi', 'getFileSize', false, this.#path);
        const cachePath = await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelMsgService/getRichMediaFilePathForGuild', false, {
            path_info: {
                md5HexStr: fileMd5,
                fileName: fileMd5,
                elementType: 2,
                elementSubType: 0,
                thumbSize: 0,
                needCreate: true,
                downloadType: 1,
                file_uuid: ''
            }
        });
        await euphonyNative.invokeNative('ns-FsApi', 'copyFile', false, {
            fromPath: this.#path,
            toPath: cachePath
        });
        return {
            elementId: '',
            elementType: Image.getElementType(),
            picElement: {
                md5HexStr: fileMd5,
                fileSize,
                picWidth: imageSize.width,
                picHeight: imageSize.height,
                fileName: fileMd5,
                sourcePath: cachePath,
                original: true,
                picType: 1001,
                picSubType: 0,
                fileUuid: '',
                fileSubId: '',
                thumbFileSize: 0,
                summary: '',
            }
        };
    }

}

export default Image