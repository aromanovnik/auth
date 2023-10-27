import * as fs from 'fs';

export const fileRemove = (path) => {
  if (!path) {
    return;
  }
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
};
