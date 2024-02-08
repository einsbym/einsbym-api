import { Injectable } from '@nestjs/common';
import { CreateResponseInput } from '../models/dtos/create-response.input';
import { UpdateResponseInput } from '../models/dtos/update-response.input';

@Injectable()
export class ResponseService {
    create(createResponseInput: CreateResponseInput) {
        return 'This action adds a new response';
    }

    findAll() {
        return `This action returns all response`;
    }

    findOne(id: number) {
        return `This action returns a #${id} response`;
    }

    update(id: number, updateResponseInput: UpdateResponseInput) {
        return `This action updates a #${id} response`;
    }

    remove(id: number) {
        return `This action removes a #${id} response`;
    }
}
