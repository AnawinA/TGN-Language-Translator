/* 
0 = Λ λ
1 = Δ δ
2 = T T
3 = Γ γ
4 = Π π
5 = N N
6 = Σ σ
7 = Z Z
swap2 = Ι ι
ΤΛΠΔΓΝΣΖ´
 */


function toGreekChar(char) {
    switch (char) {
        case "0":
            return "Λ";
            break;
        case "1":
            return "Δ";
            break;
        case "2":
            return "Τ";
            break;
        case "3":
            return "Γ";
            break;
        case "4":
            return "Π";
            break;
        case "5":
            return "Ν";
            break;
        case "6":
            return "Σ";
            break;
        case "7":
            return "Ζ";
            break;
        default:
            return char;
            break;
    }
}

function greekToNumChar(char) {
    switch (char) {
        case "Λ":
            return "0";
            break;
        case "Δ":
            return "1";
            break;
        case "Τ":
            return "2";
            break;
        case "Γ":
            return "3";
            break;
        case "Π":
            return "4";
            break;
        case "Ν":
            return "5";
            break;
        case "Σ":
            return "6";
            break;
        case "Ζ":
            return "7";
            break;
        default:
            return char;
            break;
    }
}


const input = "hello world";
const mapping = {
    'A': 'Λ',
    'D': 'Δ',
    'T': 'Τ',
    'G': 'Γ',
    'N': 'Ν',
    'P': 'Π',
    'S': 'Σ',
    'Z': 'Ζ',
    "'": '°',
    '.': '̣',
    ";": '·',
    '̣' : '̣',
};

function translate(input) {
    let translated = '';
    for (let char of input.toUpperCase()) {
        if (mapping[char] || /[^a-zA-Z0-9]/.test(char)) {
            translated += mapping[char] || char;
        }
    }
    return translated;
}


const THIRD_NUM = "1";
const SECOND_NUM = "0";

function toBase8Lang(text, isStandard = false) {
    let base8Lang = "";
    let thirdNum = THIRD_NUM;
    let secondNum = SECOND_NUM;
    for (let i = 0; i < text.length; i++) {
        let ascii = text.charCodeAt(i);
        let asciiStr = ascii.toString(8);
        let asciiOrder = ["0", "0", "0"];
        if (text[i] === '.') {
            base8Lang += ' ·';
            thirdNum = THIRD_NUM;
            secondNum = SECOND_NUM;
            continue
        } else if (text[i-1] !== "%" && text[i] === "%") {
            continue
        } else if (/[^a-zA-Z0-9]/.test(text[i]) && (text[i-1] !== "%" || text[i] === "%")) {
            base8Lang += text[i];
            continue
        } else if (asciiStr.length === 3) {
            asciiOrder = [asciiStr[0], asciiStr[1], asciiStr[2]];
        } else if (asciiStr.length === 2) {
            asciiOrder = ["0", asciiStr[0], asciiStr[1]];
        } else if (asciiStr.length === 1) {
            asciiOrder = ["0", "0", asciiStr[0]];
        }
        if (asciiOrder[0] !== thirdNum) {
            thirdNum = asciiOrder[0];
            base8Lang += toGreekChar(thirdNum) + "°";
        }
        if (asciiOrder[1] !== secondNum) {
            secondNum = asciiOrder[1];
            base8Lang += toGreekChar(secondNum) + ((isStandard) ? "." : "̣");
        }
        base8Lang += toGreekChar(asciiOrder[2]);
    }
    return base8Lang
}

function toEnglish(text) {
    let englishLang = "";
    let thirdNum = THIRD_NUM;
    let secondNum = SECOND_NUM;
    let asciiOrder = ["0", "0", "0"];
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if ((char === ' ' && text[i+1] === '·') || 
            (char === '·' && text[i-1] !== ' ')) {
            englishLang += '.';
            continue
        } else if (char === "·") {
            continue
        } else if (char === "ํ" || char === "°") {
            thirdNum = text[i-1];
        } else if (char === "̣" || char === ".") {
            secondNum = text[i-1];
        } else if (!"ΛΔΤΓΠΝΣΖ".includes(char)) {
            englishLang += text[i];
            continue
        } else if (!["ํ", "°", "̣", "."].includes(text[i+1])) {
            asciiOrder = [
                greekToNumChar(thirdNum),
                greekToNumChar(secondNum),
                greekToNumChar(char)];
            englishLang += String.fromCharCode(parseInt(asciiOrder.join(""), 8));
        }
    }
    return englishLang
}

export { toBase8Lang, toEnglish, translate };