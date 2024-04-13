import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateFileInput } from 'src/models/dtos/create-file.input';

@Injectable()
export class StorageClientService {
    constructor(private readonly configService: ConfigService) {}

    private readonly logger = new Logger(StorageClientService.name);

    async upload(files: Array<Express.Multer.File>) {
        try {
            const savedFiles: any[] = [];

            for (const file of files) {
                const url = `${this.configService.get('EINSBYM_STORAGE')}/upload`;
                const formData = new FormData();
                const blob = new Blob([file.buffer], { type: file.mimetype });

                formData.append('file', blob, file.originalname);

                const response = await axios.post(url, formData);

                savedFiles.push({ filename: response.data.filename, fileType: file.mimetype });
            }

            return savedFiles;
        } catch (error) {
            this.logger.error(`Error when upload file`);
        }
    }

    async remove(fileId: string) {
        try {
            const url = `${this.configService.get('EINSBYM_STORAGE')}/delete/${fileId}`;
            const response = await axios.delete(url);

            return response.data;
        } catch (error) {
            this.logger.error(`Error when deleting file ${fileId} from storage: ${error}`);
            throw new InternalServerErrorException(`Could not remove ${fileId}`);
        }
    }
}
