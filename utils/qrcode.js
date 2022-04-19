const QRCode = require('qrcode')
const Writeable = require("stream").Writable

const generateQR = text => {
    return new Promise(async (resolve, reject) => {
        try {
            const base64 = await QRCode.toDataURL(text)
            resolve(base64)
        } catch (error) {
            reject('qrcode error')
        }
    })
}


const generateQRStream = text => {
    return new Promise(async (resolve, reject) => {
        try {
            let read = new Writeable();
            const stream = await QRCode.toFileStream(read, text)
            resolve(stream)
        } catch (error) {
            reject('qrcode error')
        }
    })
}

module.exports = {
    generateQR,
    generateQRStream
}