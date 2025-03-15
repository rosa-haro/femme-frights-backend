const crypto = require("crypto")

const secret = "Full stack 16 Rosa REFRESH";

const secret2 = "Actualizo para que sea más difícil REFRESH"

const hash = crypto.createHmac("sha256", secret).update(secret2).digest("hex")

console.log(hash)