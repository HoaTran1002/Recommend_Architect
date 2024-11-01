import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import { firebaseConfig } from './firebase.config'; // Đảm bảo đường dẫn đúng
import { v4 as uuid } from 'uuid';

// Định nghĩa các loại file
export type TFileType = 'Video' | 'Image' | 'Document';

export interface IDataFile {
  id?: string;
  name: string;
  link: string;
  type: TFileType; // Sử dụng TFileType thay vì string
}

// Khởi tạo Firebase
initializeApp(firebaseConfig);

export interface IPramsUploadFile {
  name: string;
  file: Express.Multer.File;
}

interface IResponseUploadFile {
  name: string;
  url: string;
}

// Hàm upload file
export const uploadFileService = async (
  prams: IPramsUploadFile,
): Promise<IResponseUploadFile> => {
  const metadata = {
    contentType: prams.file.mimetype,
  };

  const storage = getStorage();
  const name = `${prams.name}-${uuid()}`;
  const storageRef = ref(storage, `files/${name}`);

  // Tải lên file
  const snapshot = await uploadBytesResumable(
    storageRef,
    prams.file.buffer,
    metadata,
  );

  // Lấy URL của file đã tải lên
  const downloadURL = await getDownloadURL(snapshot.ref);
  const result: IResponseUploadFile = {
    name: name,
    url: downloadURL,
  };
  console.log(1);
  return result;
};

// Hàm xóa file
export const deleteFileService = async (files: IDataFile[]): Promise<void> => {
  const storage = getStorage();

  try {
    const deletePromises = files.map(async (file) => {
      const storageRef = ref(storage, `files/${file.name}`);

      // Kiểm tra xem file có tồn tại không (có thể không cần thiết nếu deleteObject sẽ ném lỗi nếu file không tồn tại)
      return deleteObject(storageRef)
        .then(() => console.log(`File ${file.name} deleted successfully`))
        .catch((error) => {
          console.error(`Error deleting file ${file.name}:`, error);
          throw new Error(
            `Failed to delete file ${file.name}: ${error.message}`,
          );
        });
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
};
