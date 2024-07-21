import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { File } from '../entities/file.entity';
import { CreateFileInput } from '../models/dtos/create-file.input';
import { FileService } from '../providers/file.service';

@Resolver(() => File)
export class FileResolver {
    constructor(private readonly fileService: FileService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => File)
    createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
        return this.fileService.create(createFileInput);
    }

    @Query(() => [File])
    files(
        @Args('fileTypes', { type: () => [String] }) fileTypes: string[],
        @Args('page', { type: () => Int, nullable: true }) page = 1,
        @Args('limit', { type: () => Int, nullable: true }) limit = 12,
    ) {
        // Calculate the number of posts to skip based on the page and limit parameters
        const skip = (page - 1) * limit;

        return this.fileService.findAll(fileTypes, skip, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [File])
    findFilesByUser(@Args('userId', { type: () => String }) userId: string) {
        return this.fileService.findByUser(userId);
    }

    @Query(() => File)
    findRandomFile() {
        return this.fileService.findRandom();
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    removeFile(@Context() context: { req: Request }, @Args('id', { type: () => String }) id: string) {
        return this.fileService.remove(context.req, id);
    }
}
