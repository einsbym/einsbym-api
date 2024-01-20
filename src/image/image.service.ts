import { Injectable } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>
    ) {}

    async create(createImageInput: CreateImageInput) {
        const image = this.imageRepository.create(createImageInput);
        return await this.imageRepository.save(image);
    }

    findAll() {
        return `This action returns all image`;
    }

    findOne(id: number) {
        return `This action returns a #${id} image`;
    }

    update(id: number, updateImageInput: UpdateImageInput) {
        return `This action updates a #${id} image`;
    }

    remove(id: number) {
        return `This action removes a #${id} image`;
    }
}
