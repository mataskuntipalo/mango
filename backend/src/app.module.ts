import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FiresbaseModule } from './firebase/firebase.module';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { OrderModule } from './order/order.module';
import { PlanModule } from './plan/plan.module';
import { RaiModule } from './rai/rai.module';

@Module({
  imports: [UserModule,     
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  FiresbaseModule.forRoot({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      keyFilename: "./src/auth/mango-483e3-firebase-adminsdk-grcwk-bb64da31b8.json",
    }),
    inject: [ConfigService],
  }),
  OrderModule,
  PlanModule,
  RaiModule,
],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
