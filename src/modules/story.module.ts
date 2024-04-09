import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/entities/story.entity';
import { User } from 'src/entities/user.entity';
import { StorageClientService } from 'src/providers/storage-client.service';
import { StoryService } from 'src/providers/story.service';
import { StoryResolver } from 'src/resolvers/story.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Story, User])],
    providers: [StoryResolver, StoryService, StorageClientService],
    exports: [StoryService],
})
export class StoryModule {}
