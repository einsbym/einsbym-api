import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() createBlogInput?: CreateBlogInput, @UploadedFiles() files?: Array<Express.Multer.File>) {
        return this.blogService.create(createBlogInput, files);
    }
}
