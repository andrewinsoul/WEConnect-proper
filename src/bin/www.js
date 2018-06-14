import http from 'http';
import { app } from '../app';

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
console.log(`site launched on ${port} powered by express`);
server.listen(port);
