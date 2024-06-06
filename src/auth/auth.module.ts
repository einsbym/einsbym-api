import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserService } from 'src/providers/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user.module';
import { User } from 'src/entities/user.entity';
import { AuthResolver } from './auth.resolver';
import { UserActivityModule } from 'src/modules/user-activity.module';

@Module({
    imports: [
        UserModule,
        UserActivityModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('api.jwtSecret'),
                signOptions: { expiresIn: '2 days' },
                global: true,
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, UserService, AuthResolver, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}
