import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreatePostInput } from 'src/models/dtos/create-post.input';
import { PostService } from 'src/providers/post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async create(
        @Req() request: Request,
        @Body() createPostInput?: CreatePostInput,
        @UploadedFiles() files?: Array<Express.Multer.File>,
    ) {
        return this.postService.create(request, createPostInput, files);
    }
}
