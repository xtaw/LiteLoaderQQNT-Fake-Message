import { SingleMessage } from '../../index.js';

class Image extends SingleMessage {

    #path;

    static getElementType() {
        return 2;
    }

    constructor(path) {
        super();
        this.#path = path;
    }

    getPath() {
        return this.#path;
    }

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