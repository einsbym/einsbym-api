import { Controller, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/providers/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put('/updateCoverImage')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateCoverImage(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
        return this.userService.updateCoverImage(request, file);
    }

    @Put('/updateProfilePicture')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateProfilePicture(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
        return this.userService.updateProfilePicture(request, file);
    }
}
