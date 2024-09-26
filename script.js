import { toBase8Lang, toEnglish, translate } from "./tgnTranlate.js";

const caseCheckbox = document.getElementById('caseOption');
const standardCheckbox = document.getElementById('standardOption');
const input = document.getElementById('inputText');
const littleDesc = document.getElementById('little-desc');
littleDesc.style.display = "none";

window.toggleGroup = function() {
    var mode = document.querySelector('input[name="mode"]:checked').value;
    if (mode === 'decode') {
        swapText();
        input.placeholder = "Τ.ΠΖ.ΔΣ.ΛΠ.Ν Ζ.ΔΝ.ΖΣ.ΝΤ ΠΠ.ΝΖ.ΛΣ.Π Ν.ΛΠ.ΝΣ.ΤΠ.Ν · · ·";
        littleDesc.style.display = "block";
    } else if (mode === 'encode') {
        swapText();
        input.placeholder = "Type your text here...";
        littleDesc.style.display = "none";
    }
}

window.processText = function() {
    var mode = document.querySelector('input[name="mode"]:checked');
    var output;

    if (mode.value === 'encode') {
        output = toBase8Lang(input.value, standardCheckbox.checked);
        if (caseCheckbox.checked) {
            output = output.toLowerCase();
        }
    } else if (mode.value === 'decode') {
        input.value = translate(input.value);
        output = toEnglish(input.value);
        
    }
    document.getElementById('outputText').innerText = output;
}


window.swapText = function() {
    var inputElement = document.getElementById('inputText');
    var outputElement = document.getElementById('outputText');

    var temp = inputElement.value;
    inputElement.value = outputElement.innerText;
    outputElement.innerText = temp;

    processText();
}


window.copyClip = function() {
    let outputElement = document.getElementById('outputText');
    navigator.clipboard.writeText(outputElement.innerText);
}

caseCheckbox.addEventListener('change', processText);
standardCheckbox.addEventListener('change', processText);




document.getElementById('fontOption').addEventListener('change', function() {
    const selectedFont = this.value;
    document.getElementById('outputText').style.fontFamily = selectedFont;
});

window.processBtn = processText;


