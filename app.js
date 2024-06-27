const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = require('./models/replaceTemplate');

const hostname = '127.0.0.1';
const port = 3000;

// read the file
const data = fs.readFileSync(`${__dirname}/data/authors.json`, 'utf-8');
const authors = JSON.parse(data);
const index = fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	if (pathname === '/api') {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		});
		res.end(JSON.stringify(authors));
	} else if (pathname === '/') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});

		const cardsHtml = authors.map((el) => replaceTemplate(card, el)).join('');
		const output = index.replace(/{%AUTHOR_CARDS%}/g, cardsHtml);

		res.end(output);
	} else if (pathname === '/author') {
		const author = authors.find(
			(author) =>
				author.attributes?.name.toLowerCase() === query.q.toLowerCase()
		);

		if (author) {
			res.writeHead(200, {
				'Content-Type': 'application/json',
			});
			res.end(JSON.stringify(author));
		} else {
			res.writeHead(404, {
				'Content-Type': 'text/html',
			});
			res.end('<h1>Author Not Found</h1>');
		}
	} else {
		res.writeHead(404, {
			'Content-Type': 'text/html',
		});
		res.end('<h1>404 Not Found</h1>');
	}
});

server.listen(port, hostname, () => {
	console.log(`listenint on http://${hostname}:${port}`);
});
