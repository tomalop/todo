export default interface IFileService {
  read: () => string;
  write: (data: string) => void;
}
