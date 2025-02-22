import 'dotenv/config';
import jsonServer from 'json-server';
import { Request, Response } from 'express';

const server = jsonServer.create();
const router = jsonServer.router({
	hospitals: [],
	'healthcare-workers': [],
});
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use((req: Request, res: Response, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

server.use(middlewares);
server.use(router);

server.listen(port, () => {
	console.log(`JSON Server is running on port ${port}`);
});
