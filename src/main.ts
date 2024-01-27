import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { otelSDK } from './tracing';

async function bootstrap() {
    await otelSDK.start();
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    const port = configService.get<number>('port');
    await app.listen(port);

    Logger.log(`Server is running on: ${await app.getUrl()}`, 'API');
}
bootstrap();
