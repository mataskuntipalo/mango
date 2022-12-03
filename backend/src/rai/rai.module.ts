import { Module } from '@nestjs/common';
import { RaiService } from './rai.service';
import { RaiController } from './rai.controller';
import { FiresbaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [RaiService, FiresbaseModule],
  controllers: [RaiController]
})
export class RaiModule {}
