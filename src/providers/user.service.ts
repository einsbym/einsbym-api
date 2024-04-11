import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/models/dtos/create-user.input';
import { UpdateCoverImageInput } from 'src/models/dtos/update-cover-image.input';
import { UpdateProfilePictureInput } from 'src/models/dtos/update-profile-picture.input';
import { UpdateUserInput } from 'src/models/dtos/update-user.input';
import { UpdateBioInput } from 'src/models/dtos/update-bio.input';
import { UserStatsView } from 'src/entities/views/user-stats.view';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectEntityManager()
        private entityManager: EntityManager,
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

    async updateProfilePicture(request: Request, updateProfilePictureInput: UpdateProfilePictureInput) {
        const user: User = request['user'];

        await this.userRepository.update(user.id, {
            profilePicture: updateProfilePictureInput.profilePicture,
        });

        return this.userRepository.create({ ...user, ...updateProfilePictureInput });
    }

    async updateCoverImage(request: Request, updateCoverImageInput: UpdateCoverImageInput) {
        const user: User = request['user'];

        await this.userRepository.update(user.id, {
            coverImage: updateCoverImageInput.coverImage,
        });

        return this.userRepository.create({ ...user, ...updateCoverImageInput });
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
