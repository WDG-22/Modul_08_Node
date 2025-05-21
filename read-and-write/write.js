import fs from 'fs/promises';
import path from 'path';

const argument = process.argv.slice(2);
// console.log(process.argv[2]);

const createFileWithMessage = async (message) => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');

  const directory = `./${yyyy}-${mm}-${dd}`;

  try {
    await fs.access(directory);
  } catch {
    // console.log(error);
    await fs.mkdir(directory);
  }

  const hh = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');

  const filename = `${hh}-${min}.txt`;

  const filepath = path.join(directory, filename);

  try {
    // await fs.writeFile(filepath, message);
    await fs.appendFile(filepath, message + '\n');
    return filename;
  } catch (error) {
    console.log(error);
  }
};

createFileWithMessage(argument);
