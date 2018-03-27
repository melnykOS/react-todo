export class Validate {
    static isValidLength (string, maxLength) {
        const valid = string.length >= maxLength;

        return valid ? `Текст должен быть не больше ${maxLength}` : null;
    }

    static isEmpty (string) {
        return !string ? 'Поле не должно быть пустым' : null;
    }
}
