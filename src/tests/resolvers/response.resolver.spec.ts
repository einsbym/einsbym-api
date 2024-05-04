import { Test, TestingModule } from '@nestjs/testing';
import { ReplyResolver } from '../../resolvers/reply.resolver';
import { ReplyService } from '../../providers/reply.service';

describe('ResponseResolver', () => {
    let resolver: ReplyResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReplyResolver, ReplyService],
        }).compile();

        resolver = module.get<ReplyResolver>(ReplyResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
