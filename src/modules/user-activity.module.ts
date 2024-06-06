import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivity } from 'src/entities/user-activity.entity';
import { UserActivityService } from 'src/providers/user-activity.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserActivity]),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        BullModule.registerQueue({
            name: 'user-activity',
        }),
    ],
    providers: [UserActivityService],
    exports: [UserActivityService],
})
export class UserActivityModule {}
