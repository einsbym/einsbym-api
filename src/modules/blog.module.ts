import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from 'src/controllers/blog.controller';
import { Blog } from 'src/entities/blog.entity';
import { BlogService } from 'src/providers/blog.service';
import { StorageClientService } from 'src/providers/storage-client.service';
import { BlogResolver } from 'src/resolvers/blog.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    controllers: [BlogController],
    providers: [BlogService, StorageClientService, BlogResolver],
})
export class BlogModule {}
