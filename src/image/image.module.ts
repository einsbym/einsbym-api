import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Image, User])],
    providers: [ImageResolver, ImageService],
})
export class ImageModule {}
