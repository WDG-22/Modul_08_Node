import http from 'node:http';

// Das http-Modul enhält all die low-level-Implementationen für einen HTTP-Server. Der Server muss Netzwerkverbindungen aufbauen und stabil auf Anfragen warten. Wenn ihr neugierig seid, wie das funktioniert, schaut in ein paar Monaten mal hier vorbei: https://app.codecrafters.io/courses/http-server/overview
http
  .createServer((request, response) => {
    // Callback hat Zugriff auf die aktuelle Anfrage und die Anwort, die geschickt wird
    response.statusCode = 200; // Eine HTTP-Antwort muss einen Status Code senden (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
    response.setHeader('Content-Type', 'text/html'); // Dieser Header teilt dem Browser mit, wie er die Daten interpretieren soll. Ändert das mal zu 'text/plain' und geht wieder auf http://localhost:8000

    // Jede Anfrage muss beendet werden.
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
  .listen(8000); // Dies ist im Grunde eine lang laufende "while"-Schleife, die auf eingehende Anfragen lauscht.
