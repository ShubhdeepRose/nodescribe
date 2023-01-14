const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const replaceTemp = require('./module/replaceTemplate');


const data = fs.readFileSync(path.join(__dirname, '/data/data.json'), 'utf-8')
const dataJSON = JSON.parse(data);
const card = fs.readFileSync(path.join(__dirname, '/template/cards.html'), 'utf-8')
const main = fs.readFileSync(path.join(__dirname, '/template/index.html'), 'utf-8')
const css = fs.readFileSync(path.join(__dirname, '/css/style.css'), 'utf-8')
const notFound = fs.readFileSync(path.join(__dirname, '/template/404.html'), 'utf-8')
const cardSolo = fs.readFileSync(path.join(__dirname, '/template/cardSolo.html'), 'utf-8')
const favicon = fs.readFileSync(path.join(__dirname, '/favicon.ico'))


const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/") {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=31536000'
        })
        const resultCard = dataJSON.map(obj => replaceTemp(card, obj, "summary")).join('');
        const resultMain = main.replace(/{%CARDS%}/g, resultCard)
        res.end(resultMain);
    }
    else if (pathname === "/css/style.css") {
        res.writeHead(200, {
            'Content-Type': 'text/css',
            'Cache-Control': 'public, max-age=31536000' 
        });
        res.end(css);
    }
    
    else if (pathname === "/card") {
        try {
            const card = dataJSON[query.id-1];
            const cardSingle = replaceTemp(cardSolo, card, "full");
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Cache-Control': 'public, max-age=31536000'
            });
            res.end(cardSingle);
        }
        catch (e) {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Cache-Control': 'public, max-age=31536000'
            });
            res.end(notFound);
        }
    }
    else if(pathname === "/favicon.ico"){
        res.writeHead(200, {
            'Content-Type' : 'image/x-icon'
        })
        res.end(favicon);
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=31536000'
        });
        res.end(notFound);
    }
})


server.listen(5000, '127.0.0.1', () => {
    console.log('listening on 127.0.0.1 at port 5000');
})


// To properly check if the value is a number in JavaScript, you can use the Number() function and check if the returned value is not a NaN (Not a Number).

