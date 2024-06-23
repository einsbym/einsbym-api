import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityConsumer } from 'src/consumers/user-activity.consumer';
import { UserController } from 'src/controllers/user.controller';
import { UserActivity } from 'src/entities/user-activity.entity';
import { User } from 'src/entities/user.entity';
import { UserStatsView } from 'src/entities/views/user-stats.view';
import { StorageClientService } from 'src/providers/storage-client.service';
import { UserService } from '../providers/user.service';
import { UserResolver } from '../resolvers/user.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserStatsView, UserActivity]),
        BullModule.registerQueue({
            name: 'user-activity',
        }),
        BullModule.registerQueue({
            name: 'online-users',
        }),
    ],
    controllers: [UserController],
    providers: [UserResolver, UserService, StorageClientService, UserActivityConsumer],
    exports: [UserService, StorageClientService],
})
export class UserModule {}
