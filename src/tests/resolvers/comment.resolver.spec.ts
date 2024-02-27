import { Test, TestingModule } from '@nestjs/testing';
import { CommentResolver } from '../../resolvers/comment.resolver';
import { PostCommentService } from '../../providers/comment.service';

describe('CommentResolver', () => {
    let resolver: CommentResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CommentResolver, PostCommentService],
        }).compile();

        resolver = module.get<CommentResolver>(CommentResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
