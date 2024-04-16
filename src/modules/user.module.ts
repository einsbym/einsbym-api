import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserStatsView } from 'src/entities/views/user-stats.view';
import { UserService } from '../providers/user.service';
import { UserResolver } from '../resolvers/user.resolver';
import { UserController } from 'src/controllers/user.controller';
import { StorageClientService } from 'src/providers/storage-client.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserStatsView])],
    controllers: [UserController],
    providers: [UserResolver, UserService, StorageClientService],
    exports: [UserService, StorageClientService],
})
export class UserModule {}
