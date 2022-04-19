import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PassThrough } from 'stream';
import QRCode from 'qrcode'

export default async function getImg(req: VercelRequest, res: VercelResponse) {
    let text = req.query.text;
    if (!text) {
        res.status(400).send({ error: "请传入 text 参数，以生成二维码" })
    }
    try {
        const qrStream = new PassThrough();
        await QRCode.toFileStream(qrStream, text,
            {
                type: 'png',
                width: 300,
                errorCorrectionLevel: 'H',
                margin:2,
            }
        );
        qrStream.pipe(res);
    } catch (error) {
        return res.status(500);
    }
}