const QRCode = require('qrcode')

const generateQR = text => {
    return new Promise(async (resolve,reject) => {
        try {
            const base64 = await QRCode.toDataURL(text)
            resolve(base64)
        } catch (error) {
            reject('qrcode error')
        }
    })
}

module.exports = {
    generateQR
}