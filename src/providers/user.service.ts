import { InjectQueue, Process, Processor } from '@nestjs/bull';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Job, Queue } from 'bull';
import { UserActivity } from 'src/entities/user-activity.entity';
import { User } from 'src/entities/user.entity';
import { UserStatsView } from 'src/entities/views/user-stats.view';
import { Roles } from 'src/enums/roles.enum';
import { CreateUserActivityInput } from 'src/models/dtos/create-user-activity.input';
import { CreateUserInput } from 'src/models/dtos/create-user.input';
import { UpdateBioInput } from 'src/models/dtos/update-bio.input';
import { UpdateUserInput } from 'src/models/dtos/update-user.input';
import { EntityManager, Repository } from 'typeorm';
import { StorageClientService } from './storage-client.service';

@Injectable()
@Processor('user-activity')
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(UserActivity)
        private readonly userActivityRepository: Repository<UserActivity>,

        @InjectEntityManager()
        private entityManager: EntityManager,

        @InjectQueue('user-activity')
        private readonly queue: Queue,

        private storageClientService: StorageClientService,
    ) {}

    @Process('user-activity')
    async processJob(job: Job<CreateUserActivityInput>) {
        const { data } = job;
        await this.userActivityRepository.save(data);
    }

    async createJob(createUserActivityInput: CreateUserActivityInput) {
        await this.queue.add('user-activity', createUserActivityInput, {
            attempts: 3,
            backoff: 5000,
            removeOnComplete: true,
        });
    }

    async create(createUserInput: CreateUserInput) {
        const user = this.userRepository.create(createUserInput);

        // Check if a user with the same email already exists
        const existingUser = await this.userRepository.findOne({
            where: [{ username: user.username }, { email: user.email }],
        });

        if (existingUser) {
            throw new ConflictException('🖐️ Hey, there is already a user with the same username or email address!');
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

            await this.createJob({
                user: user,
                description: `${user.firstName} changed their profile picture.`,
            });

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

            await this.createJob({
                user: user,
                description: `${user.firstName} changed their cover image.`,
            });

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

        await this.createJob({
            user: user,
            description: `${user.firstName} changed their bio.`,
        });

        return this.userRepository.create({ ...user, ...updateBioInput });
    }

    async updateVisibility(request: Request, isPrivate: boolean) {
        const user: User = request['user'];

        await this.userRepository.update(user.id, {
            isPrivate: isPrivate,
        });

        await this.createJob({
            user: user,
            description: `${user.firstName} changed their visibility settings.`,
        });

        return this.userRepository.create({ ...user, isPrivate: isPrivate });
    }

    async updateRole(request: Request, role: Roles) {
        const user: User = request['user'];

        const roles = [Roles.ADMIN, Roles.USER];

        if (!roles.includes(role)) {
            throw new BadRequestException('invalid role');
        }

        if (user) {
            await this.userRepository.update(user.id, {
                role: role,
            });
        }

        await this.createJob({
            user: user,
            description: `${user.firstName}'s role was updated.`,
        });

        return { message: 'Role updated successfully!' };
    }

    findAll() {
        return `This action returns all user`;
    }

    async findById(id: string) {
        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async findByUsername(username: string) {
        const user = await this.userRepository.findOne({ where: { username: username } });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async fetchStats(username: string): Promise<UserStatsView> {
        return this.entityManager.findOne(UserStatsView, { where: { username: username } });
    }

    findOneByEmail(email: string) {
        return this.userRepository.findOne({ where: { email: email } });
    }

    async findActivities(request: Request): Promise<UserActivity[]> {
        const user: User = request['user'];
        const activities = await this.userActivityRepository.find({ where: { user: { id: user.id } } });

        return activities;
    }

    async follow(request: Request, userToFollowId: string) {
        const user: User = request['user'];
        const follower = await this.userRepository.findOne({
            where: { id: user.id },
            relations: ['following'],
        });
        const userToFollow = await this.userRepository.findOne({ where: { id: userToFollowId } });

        if (!follower || !userToFollow) {
            throw new NotFoundException('Users not found.');
        }

        follower.following.push(userToFollow);

        return await this.userRepository.save(follower);
    }

    async unfollow(request: Request, userToUnfollowId: string) {
        const user: User = request['user'];
        const follower = await this.userRepository.findOne({ where: { id: user.id }, relations: ['following'] });

        follower.following = follower.following.filter((user) => user.id !== userToUnfollowId);

        return await this.userRepository.save(follower);
    }

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
