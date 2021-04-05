import IFileService from './IFileService';
import fileSystem from 'fs';
import { injectable } from 'inversify';

@injectable()
export default class FileService implements IFileService {
  private fileName = './db/storage.json';

  constructor() {
  }

  public read() {
    this.validation();
    const result = fileSystem.readFileSync(this.fileName, { encoding: 'utf8', flag: 'r' });
    return result;
  }

  public write(data: string) {
    this.validation();
    fileSystem.writeFileSync(this.fileName, data, { encoding: 'utf8', flag: 'w' });
  }

  private validation() {
    try {
      fileSystem.accessSync(this.fileName, fileSystem.constants.F_OK);
    } catch (err) {
      throw new Error(err);
    }
  }
}
