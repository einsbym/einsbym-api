import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { User } from 'src/entities/user.entity';
import { CreateStoryInput } from 'src/models/dtos/create-story.input';
import { Repository } from 'typeorm';
import { StorageClientService } from './storage-client.service';

@Injectable()
export class StoryService {
    constructor(
        @InjectRepository(Story)
        private storieRepository: Repository<Story>,
        private storageClientService: StorageClientService,
    ) {}

    async create(request: Request, createStorieInput: CreateStoryInput) {
        const user: User = request['user'];

        const storie = this.storieRepository.create(createStorieInput);

        storie.user = user;

        return await this.storieRepository.save(storie);
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        const stories = await this.storieRepository.find();

        for (const storie of stories) {
            try {
                await this.storageClientService.remove(storie.fileName);
            } catch (error) {
                throw new InternalServerErrorException(
                    'Could not remove file from storage. Check the log for details.',
                );
            }
        }
        await this.storieRepository.remove(stories);
    }
}
