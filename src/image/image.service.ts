import { Injectable } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createImageInput: CreateImageInput) {
        const image = this.imageRepository.create(createImageInput);

        // Get user
        const user = await this.userRepository.findOneBy({ id: createImageInput.userId });

        // Bind image to user
        image.user = user;

        return await this.imageRepository.save(image);
    }

    async findAll() {
        return await this.imageRepository.find();
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
