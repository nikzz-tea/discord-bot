import { readdirSync, statSync } from 'fs';
import path from 'path';

const getFiles = (dir: string): string[] => {
  const files = readdirSync(dir);
  const result: string[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (statSync(filePath).isDirectory()) {
      result.push(...getFiles(filePath));
    } else if (file.endsWith('.ts') || file.endsWith('.js')) {
      result.push(filePath);
    }
  }
  return result;
};

export default getFiles;
