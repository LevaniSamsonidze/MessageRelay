// tempStore.js
let RandomCode; // მარტო ეს ინახება

function saveCode(code, ttl = 60000) {
    RandomCode = code; // ინახავს კოდს
    setTimeout(() => {
        RandomCode = null; // 1 წუთში ავტომატურად წაშლა
    }, ttl);
}

function getCode() {
    return RandomCode; // კოდის მიღება
}

module.exports = { saveCode, getCode };