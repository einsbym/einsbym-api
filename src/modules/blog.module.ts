import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
import { BlogResolver } from 'src/resolvers/blog.resolver';
import { BlogService } from 'src/providers/blog.service';

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    providers: [BlogResolver, BlogService],
})
export class BlogModule {}
