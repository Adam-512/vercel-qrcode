import type { VercelRequest, VercelResponse } from '@vercel/node';
const { generateQRStream } = require('../utils/qrcode.js')
var template = require('art-template');

export default async function getImg(req: VercelRequest, res: VercelResponse) {
    let text = req.query.text;
    if (!text) {
        res.status(400).send({ error: "请传入 text 参数，以生成二维码" })
    }
    try {
        let stream = await generateQRStream(text)
        return res.send(stream)
    } catch (error) {
        return res.status(500)
    }
}