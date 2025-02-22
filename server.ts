import 'dotenv/config';
import jsonServer from 'json-server';
// import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router({
	hospitals: [],
	'healthcare-workers': [],
});
const middlewares = jsonServer.defaults({
	static: './dist',
});

const port = process.env.PORT || 3000;

// CORS middleware
server.use((req: Request, res: Response, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

server.use(middlewares);
server.use('/api', router); // Mount API routes under /api

// Handle SPA routing
server.get('*', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(port, () => {
	console.log(`JSON Server is running on port ${port}`);
});
