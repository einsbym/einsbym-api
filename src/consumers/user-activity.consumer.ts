import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { UserActivity } from 'src/entities/user-activity.entity';
import { CreateUserActivityInput } from 'src/models/dtos/create-user-activity.input';
import { Repository } from 'typeorm';

@Injectable()
@Processor('user-activity')
export class UserActivityConsumer {
    constructor(
        @InjectRepository(UserActivity)
        private readonly userActivityRepository: Repository<UserActivity>,
    ) {}

    @Process('user-activity')
    async processUserActivityJob(job: Job<CreateUserActivityInput>) {
        const { data } = job;
        await this.userActivityRepository.save(data);
    }
}
