import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { StorageClientService } from 'src/providers/storage-client.service';
import { File } from '../entities/file.entity';
import { FileService } from '../providers/file.service';
import { FileResolver } from '../resolvers/file.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([File, User])],
    providers: [FileResolver, FileService, StorageClientService],
})
export class FileModule {}
