import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateCoverImageInput } from './dto/update-cover-image.input';
import { UpdateProfilePictureInput } from './dto/update-profile-picture.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserInput: CreateUserInput) {
        const user = this.userRepository.create(createUserInput);

        // Check if a user with the same email already exists
        const existingUser = await this.userRepository.findOne({
            where: [{ username: user.username }, { email: user.email }],
        });

        if (existingUser) {
            if (existingUser.username === user.username) {
                throw new ConflictException('Já existe um usuário com este username cadastrado');
            } else {
                throw new ConflictException('Já existe um usuário com este e-mail cadastrado');
            }
        }

        // Hash the password
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(user.password, saltOrRounds);

        user.password = hash;

        return await this.userRepository.save(user);
    }

    async updateProfilePicture(updateProfilePictureInput: UpdateProfilePictureInput) {
        const user = await this.userRepository.findOne({ where: { id: updateProfilePictureInput.id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.update(updateProfilePictureInput.id, {
            profilePicture: updateProfilePictureInput.profilePicture,
        });

        return this.userRepository.create({ ...user, ...updateProfilePictureInput });
    }

    async updateCoverImage(updateCoverImageInput: UpdateCoverImageInput) {
        const user = await this.userRepository.findOne({ where: { id: updateCoverImageInput.id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.update(updateCoverImageInput.id, {
            coverImage: updateCoverImageInput.coverImage,
        });

        return this.userRepository.create({ ...user, ...updateCoverImageInput });
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: string) {
        return this.userRepository.findOne({ where: { id: id } });
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
