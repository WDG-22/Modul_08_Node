console.log('Intro file running');

console.log('Veränderung');

// Node hat Zugriff auf andere Objekte und Methoden als JavaScript im Browser. So können wir beispielsweise Umgebungsvariablen direkt auslesen oder auf das Dateisystem zugreifen. Andere Features sind stattdessen nicht vorhanden. document.getElementById("someId") würde einen Fehler aufwerfen.
console.log(process.env.MY_ENV);

// Viele Features von Node findet ihr in eingebauten Paketen. 'fs' enthält Methoden um z.B. Dateien zu schreiben oder zu lesen.
// import { writeFileSync, writeFile } from 'node:fs';

// Die synchrone Varianten (Sync) ist nicht das übliche Vorgehen in Node. Sie blockieren den Main Thread und damit die weitere Ausführung des Programms. Aber sie haben auch dann und wann ihren Platz.
// writeFileSync('meineDatei.txt', 'Hallo Datei!');

// Typischer Node-Code ist asynchron. Eine Aufgabe wird an andere Prozesse delegiert. Node ist hier wie ein Manager und verteilt Aufgaben. Klassischerweise geben wir eine Callback-Funktion mit. Wenn die Aufgabe erledigt ist, wird der Callback aufgerufen und gibt eventuelle Fehler oder die zurückgegebenen Daten an den Main Thread zurück.
// writeFile('meineAsyncDatei.txt', 'Test from async', (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('File was created');

//     writeFile('bla.txt', 'Everything was succesful', (err) => {});
//   }
// });

// Wichtige Node Module haben heute auch eine Variante mit Promise-Syntax. Sie müssen von 'fs/promises' importiert werden.
import { writeFile, readFile } from 'node:fs/promises';

// Promises ermöglicht euch mit dem vertrauten async/await-Syntax zu arbeiten.
try {
  await writeFile('writtenInPromises.txt', 'Wurde mit modernem Promise-Syntax erstellt.');
} catch (error) {
  console.log('there was an error: ', error);
}

// Dies ist eine andere Schreibweise, der .then()-Syntax.
// writeFile('writtenInPromises.txt', 'Wurde mit modernem Promise-Syntax erstellt.')
//   .then((data) => console.log('File written'))
//   .catch((err) => console.log('there was an error: ', err));

let fileContent;

try {
  fileContent = await readFile('writtenInPromises.txt', 'utf8');
} catch (error) {
  console.log('there was an error: ', error);
}

// .then() ist ebenso Promise-basiert. Es ist nur eine andere Schreibweise.
// readFile('writtenInPromises.txt', 'utf8')
//   .then((data) => console.log(data))
//   .catch((err) => console.log('there was an error: ', err));

console.log(fileContent);
