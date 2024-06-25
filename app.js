const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

// read the file
const data = fs.readFileSync(`${__dirname}/data/authors.json`, 'utf-8');
const authors = JSON.parse(data);

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
		res.end('<h1>Hello Authors</h1>');
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
