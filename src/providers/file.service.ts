import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { CreateFileInput } from '../models/dtos/create-file.input';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) {}

    async create(createFileInput: CreateFileInput) {
        const file = this.fileRepository.create(createFileInput);
        return await this.fileRepository.save(file);
    }

    async findAll(skip: number, take: number) {
        const queryBuilder = this.fileRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename', 'p.id', 'p.createdAt'])
            .leftJoin('post', 'p', 'i.post = p.id')
            .orderBy('p.createdAt', 'DESC')
            .skip(skip)
            .take(take);

        return await queryBuilder.getMany();
    }

    async findByUser(userId: string) {
        const queryBuilder = this.fileRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename'])
            .innerJoin('post', 'p', 'i.post_id = p.id')
            .where('p.user_id = :userId', { userId })
            .orderBy('p.created_at', 'DESC')
            .limit(9);

        return await queryBuilder.getMany();
    }

    async findRandom() {
        const file = await this.fileRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.filename', 'p.id', 'u.id', 'u.username', 'u.profilePicture'])
            .leftJoin('i.post', 'p')
            .leftJoin('p.user', 'u')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne();

        return file;
    }

    async remove(id: string) {
        const image = await this.fileRepository.findOne({ where: { id: id } });

        if (!image) {
            throw new NotFoundException('File not found');
        }

        return await this.fileRepository.remove(image);
    }
}
