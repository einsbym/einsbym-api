import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from 'src/controllers/blog.controller';
import { Blog } from 'src/entities/blog.entity';
import { BlogService } from 'src/providers/blog.service';
import { StorageClientService } from 'src/providers/storage-client.service';

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    controllers: [BlogController],
    providers: [BlogService, StorageClientService],
})
export class BlogModule {}
