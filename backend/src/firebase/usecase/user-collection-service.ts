import { Inject, Injectable } from "@nestjs/common";
import { CollectionReference } from '@google-cloud/firestore';
import { UserDto } from "../dto/users.dto";
import { UserCollectionName } from "../firestore.providers";

@Injectable()
export class UserCollectionService {
    // private logger: Logger = new Logger(RawReadingsService.name);

  constructor(
    @Inject(UserCollectionName)
    private usersCollection: CollectionReference<UserDto>,
  ) {}

  async create(userDto: UserDto): Promise<UserDto> {
    const docRef = this.usersCollection.doc(userDto.telephone);
    await docRef.set(userDto);
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async getUser(telephone: string): Promise<UserDto> {
    return (await this.usersCollection.doc(telephone).get()).data();
  }
}