import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentResolver } from '../../resolvers/post-comment.resolver';
import { PostCommentService } from '../../providers/post-comment.service';

describe('CommentResolver', () => {
    let resolver: PostCommentResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostCommentResolver, PostCommentService],
        }).compile();

        resolver = module.get<PostCommentResolver>(PostCommentResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
