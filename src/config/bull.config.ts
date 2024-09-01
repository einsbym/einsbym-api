import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const bullAsyncConfig = <SharedBullAsyncConfiguration>{
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        redis: {
            host: configService.get<string>('redis.host'),
            port: configService.get<number>('redis.port'),
        },
    }),
};
