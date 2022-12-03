import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RaiDto } from 'src/firebase/dto/rai.dto';
import { RaiCollectionService } from 'src/firebase/usecase/rai-collection-service';

@Controller('admin/rai')
export class RaiController {
    constructor(private raiCollectionService: RaiCollectionService) {}

    @Post("/create")
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() rai: RaiDto): Promise<RaiDto> {
      return this.raiCollectionService.create(rai)
    }
}
