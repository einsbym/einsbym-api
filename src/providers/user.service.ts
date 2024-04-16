import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/models/dtos/create-user.input';
import { UpdateUserInput } from 'src/models/dtos/update-user.input';
import { UpdateBioInput } from 'src/models/dtos/update-bio.input';
import { UserStatsView } from 'src/entities/views/user-stats.view';
import { StorageClientService } from './storage-client.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectEntityManager()
        private entityManager: EntityManager,

        private storageClientService: StorageClientService,
    ) {}

    async create(createUserInput: CreateUserInput) {
        const user = this.userRepository.create(createUserInput);

        // Check if a user with the same email already exists
        const existingUser = await this.userRepository.findOne({
            where: [{ username: user.username }, { email: user.email }],
        });

        if (existingUser) {
            throw new ConflictException('🖐️ Hey, there is already a user with the same username or email address.');
        }

        // Hash the password
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(user.password, saltOrRounds);

        user.password = hash;

        return await this.userRepository.save(user);
    }

    async updateProfilePicture(request: Request, file: Express.Multer.File) {
        const user: User = request['user'];

        try {
            if (user.profilePicture) {
                await this.storageClientService.remove(user.profilePicture);
            }

            const uploadedFile = await this.storageClientService.uploadFile(file);

            await this.userRepository.update(user.id, {
                profilePicture: uploadedFile.filename,
            });

            user.profilePicture = uploadedFile.filename;

            const { password, ...userWithoutPassword } = user;

            return userWithoutPassword as User;
        } catch (error) {
            throw new InternalServerErrorException('Could not update the profile image. Check the log for details.');
        }
    }

    async updateCoverImage(request: Request, file: Express.Multer.File) {
        const user: User = request['user'];

        try {
            if (user.coverImage) {
                await this.storageClientService.remove(user.coverImage);
            }

            const uploadedFile = await this.storageClientService.uploadFile(file);

            await this.userRepository.update(user.id, {
                coverImage: uploadedFile.filename,
            });

            user.coverImage = uploadedFile.filename;

            const { password, ...userWithoutPassword } = user;

            return userWithoutPassword as User;
        } catch (error) {
            throw new InternalServerErrorException('Could not upload file from storage. Check the log for details.');
        }
    }

    async updateBio(request: Request, updateBioInput: UpdateBioInput) {
        const user: User = request['user'];

        await this.userRepository.update(user.id, {
            bio: updateBioInput.bio,
        });

        return this.userRepository.create({ ...user, ...updateBioInput });
    }

    findAll() {
        return `This action returns all user`;
    }

    async findById(id: string) {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findByUsername(username: string) {
        const user = await this.userRepository.findOne({ where: { username: username } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async fetchStats(username: string): Promise<UserStatsView> {
        return this.entityManager.findOne(UserStatsView, { where: { username: username } });
    }

    findOneByEmail(email: string) {
        return this.userRepository.findOne({ where: { email: email } });
    }

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
