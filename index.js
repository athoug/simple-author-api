const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const replaceTemplate = require('./models/replaceTemplate');
const isEmpty = require('./models/isEmpty');

const hostname = '127.0.0.1';
const port = 3000;

// read the file
const data = fs.readFileSync(`${__dirname}/data/authors.json`, 'utf-8');
const authors = JSON.parse(data);
const index = fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

// create the server
const server = http.createServer((req, res) => {
	// get the url and query parameters
	const { query, pathname } = url.parse(req.url, true);

	// setup the routes
	if (pathname === '/api') {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		});
		res.end(JSON.stringify(authors));
	} else if (pathname === '/') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});
		let authorsData = [];
		if (query.q) {
			authorsData = authors.filter(
				(author) =>
					author.attributes.name.match(new RegExp(query.q, 'i')) ||
					author.attributes.nationality.match(new RegExp(query.q, 'i')) ||
					author.attributes.blurb.match(new RegExp(query.q, 'i'))
			);
		} else {
			authorsData = authors;
		}
		const cardsHtml = authorsData
			.map((el) => replaceTemplate(card, el))
			.join('');
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
	} else if (pathname === '/books.png') {
		fs.readFile(path.join(__dirname, 'public', 'books.png'), (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('500 Internal Server Error');
				return;
			}
			res.writeHead(200, { 'Content-Type': 'image/png' });
			res.end(data);
		});
	} else {
		res.writeHead(404, {
			'Content-Type': 'text/html',
		});
		res.end('<h1>404 Not Found</h1>');
	}
});

server.listen(port, hostname, () => {
	console.log(`listening on http://${hostname}:${port}`);
});
