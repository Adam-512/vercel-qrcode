import type { VercelRequest, VercelResponse } from '@vercel/node';
const { generateQR } = require('../utils/qrcode.js')
var template = require('art-template');

export default async function index(req: VercelRequest, res: VercelResponse) {
    let text = req.query.text;
    if (!text) {
        res.status(400).send({ error: "请传入 text 参数，以生成二维码" })
    }
    try {
        let base64 = await generateQR(text,{
            scale:30
        })
        var html = template.render(`
            <div 
                style="display: flex;
                width: 100vw;
                height: 100vh;
                justify-content: center;
                align-items: center;">
                <img src=<%=value%> style="width: 200px;height: 200px;" />
            </div>
        `, { value: base64 });
        return res.send(html)
    } catch (error) {
        return res.status(500)
    }
}