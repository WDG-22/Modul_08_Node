import http from 'node:http';

http
  .createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(`
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
      html {
        color-scheme: dark;
      }
    </style>

  </head>

  <body>
    <h1>Sent from my Node Server</h1>
  </body>

  <script>
      console.log("Running in the Browser")
  </script>

</html>
      `);
  })
  .listen(8000);
