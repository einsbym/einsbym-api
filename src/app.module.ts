import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from './config/graphql.config';

@Module({
    imports: [GraphQLModule.forRoot(graphqlConfig), ImageModule],
})
export class AppModule {}
