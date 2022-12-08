import { Inject, Injectable } from "@nestjs/common";
import { CollectionReference } from '@google-cloud/firestore';
import { UserDto } from "../dto/users.dto";
import { PlanCollectionName } from "../firestore.providers";

@Injectable()
export class PlanCollectionService {
    // private logger: Logger = new Logger(RawReadingsService.name);

  constructor(
    @Inject(PlanCollectionName)
    private planCollection: CollectionReference<any>,
  ) {}

  async create(plan: any): Promise<UserDto> {
    const docRef = this.planCollection.doc(plan.raiName);
    await docRef.set(plan);
    return plan;
  }
}

