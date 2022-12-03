import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { UserDto } from 'src/firebase/dto/users.dto';
import { UserCollectionService } from 'src/firebase/usecase/user-collection-service';

@Controller('user')
export class UserController {
    constructor(private userCollection: UserCollectionService) {}
    
    @Post("/create")
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() userDto: UserDto): Promise<UserDto> {
      return this.userCollection.create(userDto)
    }

    @Get([""])
    getCustomer(@Query("id") telephone: string) {
      return this.userCollection.getUser(telephone)
    }

    @Post(["/login"])
    test() {
      return "ok"
    }
    
    // @Get(["/test"])
    // test1() {
    //   const result = this.plan.create()
    //   return result
    // }

    // @Get(["/test1"])
    // tes21() {
    //   const result = this.plan.createPlan()
    //   return result
    // }
}
