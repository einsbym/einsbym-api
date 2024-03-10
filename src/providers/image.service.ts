import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageInput } from '../models/dtos/create-image.input';
import { UpdateImageInput } from '../models/dtos/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
    ) {}

    async create(createImageInput: CreateImageInput) {
        const image = this.imageRepository.create(createImageInput);
        return await this.imageRepository.save(image);
    }

    async findAll(skip: number, take: number) {
        const queryBuilder = this.imageRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename', 'p.id', 'p.createdAt'])
            .leftJoin('post', 'p', 'i.post = p.id')
            .orderBy('p.createdAt', 'DESC')
            .skip(skip)
            .take(take);

        return await queryBuilder.getMany();
    }

    async findByUser(userId: string) {
        const queryBuilder = this.imageRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename'])
            .innerJoin('post', 'p', 'i.post_id = p.id')
            .where('p.user_id = :userId', { userId })
            .orderBy('p.created_at', 'DESC')
            .limit(9);

        return await queryBuilder.getMany();
    }

    async findRandom() {
        const image = await this.imageRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename', 'p.id', 'u.id', 'u.username', 'u.profilePicture'])
            .leftJoin('i.post', 'p')
            .leftJoin('p.user', 'u')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne();

        console.log(image);

        return image;
    }

    update(id: number, updateImageInput: UpdateImageInput) {
        return `This action updates a #${id} image`;
    }

    async remove(id: string) {
        const image = await this.imageRepository.findOne({ where: { id: id } });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        return await this.imageRepository.remove(image);
    }
}
