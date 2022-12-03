import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { RaiCollectionName } from '../firestore.providers';
import { nanoid } from 'nanoid';
import { RaiDto } from '../dto/rai.dto';

@Injectable()
export class RaiCollectionService {
  // private logger: Logger = new Logger(RawReadingsService.name);

  constructor(
    @Inject(RaiCollectionName)
    private orderCollection: CollectionReference<RaiDto>,
  ) {}

  async create(rai: RaiDto): Promise<RaiDto> {
    const dupRai = await this.orderCollection.where('name', '==', rai.name).get();
    if(!dupRai.empty) throw new ConflictException("Name duplicated")
    const raiId = nanoid(6);
    const raiRef = this.orderCollection.doc(raiId);
    rai.id = raiId
    await raiRef.set(rai);
    return rai;
  }

  async getAll(): Promise<RaiDto[]> {
    let rais: RaiDto[] = [];
    (await this.orderCollection.get()).forEach(rai => {
      rais.push(rai.data())
    });
    return rais
  }

  async update(order: RaiDto): Promise<RaiDto> {
    const orderRef = this.orderCollection.doc(order.id);
    await orderRef.set(order);
    return order;
  }
}
