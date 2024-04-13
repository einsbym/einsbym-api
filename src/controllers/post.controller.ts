import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreatePostInput } from 'src/models/dtos/create-post.input';
import { PostService } from 'src/providers/post.service';

@Controller()
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('/upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @Req() request,
        @Body() createPostInput?: CreatePostInput,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.postService.create(request, createPostInput, file);
    }
}
