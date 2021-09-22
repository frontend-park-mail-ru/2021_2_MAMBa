const http = require('http');
const fs = require("fs");
const pug = require("pug");
const page404 = 'Error404';
const mime = require("mime");

const server = http.createServer((req, res) => {
    const url = req.url === '/' ? '../public/index.html' : req.url;
    console.log(`${req.url}`);
    if (url.endsWith(".pug")) {
        const name = "template";
        let templateFunc = pug.compileFileClient(
            `../public/${url}`,{
                name: name,
                basedir: "../public/"
            }) + "; export default  " +  name;
        res.setHeader("Content-Type", "application/javascript");
        res.write(templateFunc);
        res.end();
        return;
    }
    fs.readFile(`../public/${url}`, (err, data) => {
        if (req.url !== '/favicon.ico') {
            if (err) {
                data = page404;
                res.write(data);
                return;
            }

            res.setHeader("Content-Type", mime.getType(url));
            res.write(data);
            res.end();
        }
        res.end();
    });
});

console.log('listening at http://127.0.0.1:8081');
server.listen(8081);
