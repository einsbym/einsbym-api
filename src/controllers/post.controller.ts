import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreatePostInput } from 'src/models/dtos/create-post.input';
import { PostService } from 'src/providers/post.service';

@Controller()
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('/upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async upload(
        @Req() request: Request,
        @Body() createPostInput?: CreatePostInput,
        @UploadedFiles() files?: Array<Express.Multer.File>,
    ) {
        return this.postService.create(request, createPostInput, files);
    }
}
