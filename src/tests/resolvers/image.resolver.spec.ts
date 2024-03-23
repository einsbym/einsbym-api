import { Test, TestingModule } from '@nestjs/testing';
import { FileResolver } from '../../resolvers/file.resolver';
import { FileService } from '../../providers/file.service';

describe('ImageResolver', () => {
    let resolver: FileResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FileResolver, FileService],
        }).compile();

        resolver = module.get<FileResolver>(FileResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
