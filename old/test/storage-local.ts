import * as fs from 'fs';
import * as path from 'path';

import { LocalStorage } from '../src/storage-local';
import { TestStorage } from './storage';

// -----------------------------------------------------------------------------

const tmpPath = path.join(__dirname, 'storage-ctxghtbsi.json');
setTimeout(() => {fs.unlink(tmpPath, () => {})}, 1000);

TestStorage('LocalStorage', () => {
    try {fs.unlinkSync(tmpPath)} catch (_) {}
    return LocalStorage(tmpPath);
});