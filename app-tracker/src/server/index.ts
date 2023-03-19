import http from 'http';

interface IIncomingSearchRecieveData {
  query: string;
}

export const server = http.createServer((req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });
  }

  if (req.method === 'POST' && req.url === '/api/search-receive') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // Handle the data received in the request body
      const parsedBody: IIncomingSearchRecieveData = JSON.parse(body);
      console.log(parsedBody.query);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Received data');
    });
  } else {
    // Handle other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});
