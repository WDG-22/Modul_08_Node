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

const recipesRouter = (req, res, id) => {
  console.log(req.method);

  switch (req.method) {
    case 'GET':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      if (id) {
        res.end(JSON.stringify(recipes[id - 1]));
      } else {
        res.end(JSON.stringify(recipes));
      }
      break;
    case 'POST':
      console.log('Füge neues Rezept hinzu');
      const desc = req.searchParams.get('data');

      recipes.push({ id: recipes.length + 1, desc });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Recipe added ' }));
      break;
    default:
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
};

const server = http.createServer((req, res) => {
  const url = new URL('http://localhost:8000' + req.url);
  // console.log(url);
  const { pathname, searchParams } = url;

  req.searchParams = searchParams;

  const [_, resource, id] = pathname.split('/');

  // if (pathname === '/recipes') {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(recipes));
  //   return;
  // } else if (pathname === '/recipes/1') {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(recipes[0]));
  //   return;
  // }

  switch (resource) {
    case 'recipes':
      recipesRouter(req, res, id);
      break;

    case 'books':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify([{ id: 1, title: 'Der Herr der Ringe' }]));
      break;

    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Not found' }));
  }
});

server.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
