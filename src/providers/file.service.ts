import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { CreateFileInput } from '../models/dtos/create-file.input';
import { StorageClientService } from './storage-client.service';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        private readonly storageClientService: StorageClientService,
    ) {}

    async create(createFileInput: CreateFileInput) {
        const file = this.fileRepository.create(createFileInput);
        return await this.fileRepository.save(file);
    }

    // NOTE: Actually, we should be doing this in `PostService`, not here.
    async findAll(fileTypes: string[], skip: number, take: number) {
        const queryBuilder = this.fileRepository
            .createQueryBuilder('f')
            .select([
                'f.id',
                'f.filename',
                'f.fileType',
                'p.id',
                'p.postText',
                'p.createdAt',
                'u.id',
                'u.username',
                'u.profilePicture',
                'u.isPrivate',
            ])
            .leftJoin('f.post', 'p')
            .leftJoin('p.user', 'u')
            .where('f.fileType IN (:...fileTypes)', { fileTypes: fileTypes })
            .andWhere('u.isPrivate = false')
            .orderBy('p.createdAt', 'DESC')
            .skip(skip)
            .take(take);

        return await queryBuilder.getMany();
    }

    async findByUser(userId: string) {
        const queryBuilder = this.fileRepository
            .createQueryBuilder('f')
            .select(['f.id', 'f.filename', 'f.fileType'])
            .innerJoin('post', 'p', 'f.post_id = p.id')
            .where('p.user_id = :userId', { userId })
            .orderBy('p.created_at', 'DESC')
            .limit(9);

        return await queryBuilder.getMany();
    }

    async findRandom() {
        const file = await this.fileRepository
            .createQueryBuilder('f')
            .select([
                'f.id',
                'f.filename',
                'f.fileType',
                'p.id',
                'u.id',
                'u.username',
                'u.profilePicture',
                'u.isPrivate',
            ])
            .leftJoin('f.post', 'p')
            .leftJoin('p.user', 'u')
            .where('f.fileType != :fileType', { fileType: 'video/mp4' })
            .andWhere('u.isPrivate = false')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne();

        return file;
    }

    async remove(request: Request, id: string) {
        const file = await this.fileRepository.findOneBy({ id: id });

        try {
            await this.storageClientService.remove(file.filename);
            await this.fileRepository.remove(file);

            return 'File removed successfully';
        } catch (error) {
            throw new InternalServerErrorException('Could not remove file. Check the log for details.');
        }
    }
}
