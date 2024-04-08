import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class StorageClientService {
    constructor(private readonly configService: ConfigService) {}

    private readonly logger = new Logger(StorageClientService.name);

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
