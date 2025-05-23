import { createServer } from 'http';
import createFileWithMessage from '../read-and-write/write.js';
import path from 'path';
import deleteFileByName from '../read-and-write/delete.js';
import { readFile } from 'fs/promises';

// Diese Datei liest sich am besten von unten nach oben: Server -> filesRouter -> createFile -> deleteFile -> getFile

const port = 8000;

// Dies ist eine Helferfunktion, um uns diese 3 Zeilen abzukürzen, die wir immer wieder brauchen werden.
const respond = (res, statusCode, contentType, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', contentType);
  res.end(data);
};

// Controller (Ende in unserer Funtionspipeline), der mit einem Dateipfad den Inhalt einer Datei ausliest und an den Klienten zurück schickt.
const getFile = async (req, res, directory, file) => {
  const filePath = path.join(directory, file);

  // Packt Abschnitte, in denen ein Error aufgeworfen werden kann immer in ein try-catch-Block
  try {
    // Node Methode readFile (promise)
    const data = await readFile(filePath, 'utf8');
    // Wenn der Pfad gültig ist, wird die (Text)-Datei ausgelesen und wir schicken den inhalt an den Klienten.
    respond(res, 200, 'application/json', JSON.stringify({ data }));
  } catch {
    // Wenn readFile fehlschlägt, schicken wir eine Fehlernachricht zurück.
    // Der Error muss aufgefangen werden, sonst Crasht der Node-Server!
    respond(res, 404, 'application/json', JSON.stringify({ msg: 'File not found' }));
  }
};

const deleteFile = async (req, res, directory, file) => {
  const filePath = path.join(directory, file);

  try {
    // Hier rufen wir unsere einene Funktion auf
    await deleteFileByName(filePath);
    // Wenn kein Fehler auftritt, können wir eine Erfolgsnachricht zurückschicken.
    respond(res, 200, 'application/json', JSON.stringify({ msg: 'File deleted' }));
  } catch {
    respond(res, 404, 'application/json', JSON.stringify({ msg: 'File not found' }));
  }
};

// Dieser Controller nimmt eine Nachricht entgegen (aus den searchParams oder aus dem body des Requests) und speichert sie in einer Datei.
const createFile = async (req, res, searchParams) => {
  // Wenn ihr mit den searchParams arbeitet, könnt ihr die Daten so herausholen
  // const message = searchParams.get('text');

  // Node kann den Request body nicht automatisch auslesen. Hier eine (halbwegs einfache) manuelle Möglichkeit:
  // Die JSON-Nachricht kommt in rohen Datenstücken, die sammeln wir in diesem Container "chunks".
  const chunks = [];

  // Hier nehmen wir die einzelnen Datanstücke und packen sie in unseren Container.
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  // Hier wandeln wir den Container zunächst in einen String und dann den String in ein JavaScript Objekt um.
  const body = JSON.parse(Buffer.concat(chunks).toString());

  try {
    // Wir rufen unsere eigene Funktion aus dem anderen Modul auf. Die Nachricht kam entweder aus den searchParams oder aus dem JSON Body
    const filepath = await createFileWithMessage(body.text);
    respond(res, 200, 'application/json', JSON.stringify({ msg: 'Message saved', filepath }));
  } catch (error) {
    console.log(error);
    respond(res, 500, 'application/json', JSON.stringify({ msg: 'Server error' }));
  }
};

// Diese Funktion entscheidet, was mit "/files" Anfragen geschehen soll. Sie schaut sich dafür das mitgesendete HTTP-Verb an (GET, POST...)
const filesRouter = (req, res, directory, file, searchParams) => {
  switch (req.method) {
    case 'POST':
      return createFile(req, res, searchParams);
    case 'DELETE':
      return deleteFile(req, res, directory, file);
    case 'GET':
      return getFile(req, res, directory, file);
    default:
      respond(res, 405, 'application/json', JSON.stringify({ msg: 'Method not allowed' }));
  }
};

const server = createServer((req, res) => {
  // Wir holen die Informationen aus der URL der anfrage heraus, die wir brauchen - die einzelnen Bestandteile des Pfades und sie searchParams
  const url = new URL('http://localhost:8000' + req.url);
  const { pathname, searchParams } = url;
  const [_, route, directory, file] = pathname.split('/');

  switch (route) {
    case 'files':
      filesRouter(req, res, directory, file, searchParams);
      break;

    default:
      respond(res, 404, 'application/json', JSON.stringify({ msg: 'Not found' }));
  }
});

// Hier startet der Server - alles andere war "Konfiguration" :)
server.listen(port, () => console.log(' A Simple Webserver is listening on port ' + port));
