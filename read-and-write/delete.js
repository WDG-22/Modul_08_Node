import fs from 'fs/promises';

const filepath = process.argv[2];

const deleteFileByName = async (filepath) => {
  try {
    await fs.access(filepath);
    await fs.unlink(filepath);
  } catch {
    console.log(`No file exists on: ${filepath}`);
  }
};

deleteFileByName(filepath);
