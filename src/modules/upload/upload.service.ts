import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { Multer } from 'multer';

@Injectable()
export class UploadService {
  private storage: Storage;
  private bucketName: string = 'your-bucket-name'; // Thay thế bằng tên bucket của bạn

  constructor() {
    // Khởi tạo Firebase Storage
    this.storage = new Storage({
      keyFilename: 'path/to/your/service-account-file.json', // Đường dẫn đến tệp JSON xác thực
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const blob = this.storage
      .bucket(this.bucketName)
      .file(`${uuidv4()}-${file.originalname}`);
    const stream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => reject(error));
      stream.on('finish', () => {
        // Trả về URL công khai của hình ảnh đã tải lên
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
        resolve(publicUrl);
      });
      stream.end(file.buffer);
    });
  }
}
