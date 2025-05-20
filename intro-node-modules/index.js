console.log('Intro file running');

console.log('Veränderung');

console.log(process.env.MY_ENV);

// import { writeFileSync, writeFile } from 'node:fs';

// writeFileSync('meineDatei.txt', 'Hallo Datei!');

// writeFile('meineAsyncDatei.txt', 'Test from async', (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('File was created');

//     writeFile('bla.txt', 'Everything was succesful', (err) => {});
//   }
// });

import { writeFile, readFile } from 'node:fs/promises';

try {
  await writeFile('writtenInPromises.txt', 'Wurde mit modernem Promise-Syntax erstellt.');
} catch (error) {
  console.log('there was an error: ', error);
}

let fileContent;

try {
  fileContent = await readFile('writtenInPromises.txt', 'utf8');
} catch (error) {
  console.log('there was an error: ', error);
}

console.log(fileContent);
