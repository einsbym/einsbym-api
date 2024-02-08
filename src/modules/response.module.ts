import { Module } from '@nestjs/common';
import { ResponseService } from '../providers/response.service';
import { ResponseResolver } from '../resolvers/response.resolver';

@Module({
    providers: [ResponseResolver, ResponseService],
})
export class ResponseModule {}
