import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class StorageClientService {
    constructor(private readonly configService: ConfigService) {}

    private readonly logger = new Logger(StorageClientService.name);

    async removeFromStorage(imageId: string) {
        try {
            const url = `${this.configService.get('EINSBYM_STORAGE')}/delete/${imageId}`;
            const response = await axios.delete(url);

            return response.data;
        } catch (error) {
            this.logger.error('error when deleting image from Minio', error);
        }
    }
}
