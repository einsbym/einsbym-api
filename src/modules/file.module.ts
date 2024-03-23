import { Module } from '@nestjs/common';
import { FileService } from '../providers/file.service';
import { FileResolver } from '../resolvers/file.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([File, User])],
    providers: [FileResolver, FileService],
})
export class FileModule {}
