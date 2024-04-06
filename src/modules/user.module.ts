import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserStatsView } from 'src/entities/views/user-stats.view';
import { UserService } from '../providers/user.service';
import { UserResolver } from '../resolvers/user.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserStatsView])],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
