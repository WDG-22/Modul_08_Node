import http from 'http';

const port = process.env.PORT || 8000;

const recipes = [
  {
    id: 1,
    ingredients: ['flour', 'honey'],
    desc: 'Alles vermischen',
  },
  {
    id: 2,
    ingredients: ['flour', 'honey'],
    desc: 'Alles vermischen',
  },
];

const server = http.createServer((req, res) => {
  console.log(new URL('http://localhost:8000' + req.url));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(recipes));
});

server.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
