import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FiresbaseModule } from 'src/firebase/firebase.module';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports:[FiresbaseModule, PlanModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule {}
