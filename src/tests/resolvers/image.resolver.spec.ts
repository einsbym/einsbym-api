import { Test, TestingModule } from '@nestjs/testing';
import { ImageResolver } from '../../resolvers/image.resolver';
import { ImageService } from '../../providers/image.service';

describe('ImageResolver', () => {
    let resolver: ImageResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ImageResolver, ImageService],
        }).compile();

        resolver = module.get<ImageResolver>(ImageResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
