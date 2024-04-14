import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

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

                const response = await axios.post(url, formData).catch((error: AxiosError) => {
                    throw new AxiosError(error.response.statusText);
                });

                savedFiles.push({ filename: response.data.filename, fileType: file.mimetype });
            }

            return savedFiles;
        } catch (error) {
            this.logger.error(`${error}`);
            throw new InternalServerErrorException(error);
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
