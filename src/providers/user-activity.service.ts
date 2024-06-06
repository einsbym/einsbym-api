import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { CreateUserActivityInput } from 'src/models/dtos/create-user-activity.input';
import { UserActivity } from 'src/entities/user-activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Processor('user-activity')
export class UserActivityService {
    constructor(
        @InjectRepository(UserActivity)
        private userActivityRepository: Repository<UserActivity>,

        @InjectQueue('user-activity')
        private readonly queue: Queue,
    ) {}

    @Process('user-activity')
    async createUserActivityJob(job: Job<CreateUserActivityInput>) {
        const { data } = job;
        await this.userActivityRepository.save(data);
    }

    async createUserActivityQueue(createUserActivityInput: CreateUserActivityInput) {
        await this.queue.add('user-activity', createUserActivityInput);
    }
}
