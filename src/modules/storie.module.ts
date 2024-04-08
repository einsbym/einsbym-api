import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storie } from 'src/entities/storie.entity';
import { User } from 'src/entities/user.entity';
import { StorageClientService } from 'src/providers/storage-client.service';
import { StorieService } from 'src/providers/storie.service';
import { StorieResolver } from 'src/resolvers/storie.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Storie, User])],
    providers: [StorieResolver, StorieService, StorageClientService],
    exports: [StorieService],
})
export class StorieModule {}
