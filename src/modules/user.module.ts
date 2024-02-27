import { Module } from '@nestjs/common';
import { UserService } from '../providers/user.service';
import { UserResolver } from '../resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
