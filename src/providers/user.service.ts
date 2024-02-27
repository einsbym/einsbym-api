import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/models/dtos/create-user.input';
import { UpdateCoverImageInput } from 'src/models/dtos/update-cover-image.input';
import { UpdateProfilePictureInput } from 'src/models/dtos/update-profile-picture.input';
import { UpdateUserInput } from 'src/models/dtos/update-user.input';
import { UpdateBioInput } from 'src/models/dtos/update-bio.input';

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

    async updateBio(updateBioInput: UpdateBioInput) {
        const user = await this.userRepository.findOne({ where: { id: updateBioInput.userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.update(updateBioInput.userId, {
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
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
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
