import { SingleMessage } from '../../index.js';

/**
 * `Audio` 类型代表一个语音消息元素。
 * 
 * @property { String } #path 音频路径。
 * @property { Number } #duration 语音显示时长（单位：秒）。
 */
class Audio extends SingleMessage {

    #path;
    #duration;

    /**
     * 返回该消息元素所对应的 **elementType**，值为 **4**。
     * 
     * @returns { Number } 该消息元素所对应的 **elementType**，值为 **4**。
     */
    static getElementType() {
        return 4;
    }

    /**
     * 构造一个路径为 `path`，显示时长为 `duration` 的语音消息元素。
     * 
     * 若不传入 `duration`，则 `toElement` 函数会尝试自动计算语音时长（可能完全不准确）。
     * 
     * @param { String } path 音频路径。
     * @param { Number } duration 语音显示时长。单位为秒。
     */
    constructor(path, duration = undefined) {
        super();
        this.#path = path;
        this.#duration = duration;
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
     * 返回该消息元素的 `#duration` 属性。
     * 
     * @returns { Number } 该消息元素的 `#duration` 属性。
     */
    getDuration() {
        return this.#duration;
    }

    /**
     * 构造并返回该消息元素所对应的 **element** 对象。
     * 
     * @returns { Native } 该消息元素所对应的 **element** 对象。
     */
    async toElement() {
        const fileMd5 = await euphonyNative.invokeNative('ns-FsApi', 'getFileMd5', false, this.#path);
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
            elementType: Audio.getElementType(),
            pttElement: {
                fileName: fileMd5,
                filePath: cachePath,
                md5HexStr: fileMd5,
                fileSize,
                duration: this.#duration ?? Math.max(1, Math.round(fileSize / 1024 / 3)),
                formatType: 1,
                voiceType: 1,
                voiceChangeType: 0,
                canConvert2Text: true,
                waveAmplitudes: [
                    0, 18, 9, 23, 16, 17, 16, 15, 44, 17, 24, 20, 14, 15, 17
                ],
                fileSubId: '',
                playState: 1,
                autoConvertText: 0
            }
        };
    }

}

export default Audio