import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('port');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port);

    Logger.log(`🚀 Server is running on: ${await app.getUrl()}`, 'API');
}
bootstrap();
