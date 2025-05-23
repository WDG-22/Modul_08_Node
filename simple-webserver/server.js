import { createServer } from 'http';
import createFileWithMessage from '../read-and-write/write.js';
import path from 'path';
import deleteFileByName from '../read-and-write/delete.js';
import { readFile } from 'fs/promises';

const port = 8000;

const respond = (res, statusCode, contentType, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', contentType);
  res.end(data);
};

const createFile = async (req, res, searchParams) => {
  // const message = searchParams.get('text');

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const body = JSON.parse(Buffer.concat(chunks).toString());

  try {
    const filepath = await createFileWithMessage(body.text);
    respond(res, 200, 'application/json', JSON.stringify({ msg: 'Message saved', filepath }));
  } catch (error) {
    console.log(error);
    respond(res, 500, 'application/json', JSON.stringify({ msg: 'Server error' }));
  }
};

const deleteFile = async (req, res, directory, file) => {
  const filePath = path.join(directory, file);

  try {
    await deleteFileByName(filePath);
    respond(res, 200, 'application/json', JSON.stringify({ msg: 'File deleted' }));
  } catch {
    respond(res, 404, 'application/json', JSON.stringify({ msg: 'File not found' }));
  }
};

const getFile = async (req, res, directory, file) => {
  const filePath = path.join(directory, file);

  try {
    const data = await readFile(filePath, 'utf8');
    respond(res, 200, 'application/json', JSON.stringify({ data }));
  } catch {
    respond(res, 404, 'application/json', JSON.stringify({ msg: 'File not found' }));
  }
};

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

server.listen(port, () => console.log(' A Simple Webserver is listening on port ' + port));
