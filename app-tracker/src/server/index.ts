import http from 'http';
import { Storage } from '../instances/storage/storage';

interface IIncomingSearchRecieveData {
  query: string;
}

export const server = http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
  };
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  } else {
    res.writeHead(200, headers);
  }

  if (req.method === 'POST' && req.url === '/api/search-receive') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // Handle the data received in the request body
      const parsedBody: IIncomingSearchRecieveData = JSON.parse(body);

      Storage.stampSearchText(parsedBody.query);

      res.end('Received data');
    });
  } else {
    // Handle other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});
