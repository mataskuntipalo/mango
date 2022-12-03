import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FiresbaseModule } from 'src/firebase/firebase.module';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  providers: [UserService, FiresbaseModule, PlanModule],
  controllers: [UserController]
})
export class UserModule {}
