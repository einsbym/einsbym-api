import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/enums/roles.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateBlogInput } from 'src/models/dtos/create-blog.input';
import { BlogService } from 'src/providers/blog.service';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Role(Roles.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() createBlogInput: CreateBlogInput, @UploadedFile() file: Express.Multer.File) {
        return this.blogService.create(createBlogInput, file);
    }
}
