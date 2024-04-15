import { At, AtAll, PlainText, Image, Audio, Raw } from '../index.js';

class SingleMessage {

    static fromNative(element) {
        switch (element?.elementType) {
            case PlainText.getElementType():
            case At.getElementType():
            case AtAll.getElementType():
                const textElement = element?.textElement;
                switch (textElement?.atType) {
                    case 0:
                        return new PlainText(textElement?.content);
                    case 1:
                        return new AtAll(textElement?.content);
                    case 2:
                        return new At(textElement?.atUid, textElement?.atNtUid);
                }
                break;
            case Image.getElementType():
                return new Image(element?.picElement?.sourcePath);
            case Audio.getElementType():
                const pttElement = element?.pttElement;
                return new Audio(pttElement?.filePath, pttElement?.duration);
        }
        return new Raw(element);
    }

    static getElementType() {
        throw new Error('Abstract method not implemented.');
    }

    async toElement() {
        throw new Error('Abstract method not implemented.');
    }

}

export default SingleMessage