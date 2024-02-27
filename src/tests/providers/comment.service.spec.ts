import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentService } from '../../providers/comment.service';

describe('CommentService', () => {
    let service: PostCommentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostCommentService],
        }).compile();

        service = module.get<PostCommentService>(PostCommentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
