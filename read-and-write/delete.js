import fs from 'fs/promises';

const filepath = process.argv[2];

const deleteFileByName = async (filepath) => {
  try {
    await fs.access(filepath);
    await fs.unlink(filepath);
  } catch {
    throw new Error(`No file exists on: ${filepath}`);
  }
};

// deleteFileByName(filepath);

export default deleteFileByName;
