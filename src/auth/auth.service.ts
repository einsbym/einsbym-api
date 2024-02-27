import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/providers/user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninInput } from './dto/signin.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    async signIn(signinInput: SigninInput) {
        const user = await this.usersService.findOneByEmail(signinInput.email);

        if (!user || !(await bcrypt.compare(signinInput.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password, ...userWithoutPassword } = user;
        const payload = { sub: user.id };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: userWithoutPassword,
        };
    }

    async getUser(id: string) {
        const user = await this.usersService.findById(id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }
}
