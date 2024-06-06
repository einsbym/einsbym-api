import { BullModuleAsyncOptions } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const bullAsyncConfig = <BullModuleAsyncOptions>{
    name: 'user-activity',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        redis: {
            host: configService.get<string>('redis.host'),
            port: configService.get<string>('redis.port'),
        },
    }),
};
