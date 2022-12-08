import { Module, DynamicModule } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';
import {
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
  FirestoreCollectionProviders,
} from './firestore.providers';
import { UserCollectionService } from './usecase/user-collection-service';
import { OrderCollectionService } from './usecase/order-collection-service';
import { RaiCollectionService } from './usecase/rai-collection-service';
import { PlanCollectionService } from './usecase/plan-collection-service';

type FirestoreModuleOptions = {
  imports: any[];
  useFactory: (...args: any[]) => Settings;
  inject: any[];
};

@Module({})
export class FiresbaseModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider = {
      provide: FirestoreOptionsProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    const dbProvider = {
      provide: FirestoreDatabaseProvider,
      useFactory: (config) => new Firestore(config),
      inject: [FirestoreOptionsProvider],
    };
    const collectionProviders = FirestoreCollectionProviders.map(
      (providerName) => ({
        provide: providerName,
        useFactory: (db) => db.collection(providerName),
        inject: [FirestoreDatabaseProvider],
      }),
    );
    return {
      global: true,
      module: FiresbaseModule,
      imports: options.imports,
      providers: [
        UserCollectionService,
        OrderCollectionService,
        RaiCollectionService,
        PlanCollectionService,
        optionsProvider,
        dbProvider,
        ...collectionProviders,
      ],
      exports: [
        UserCollectionService,
        OrderCollectionService,
        RaiCollectionService,
        PlanCollectionService,
        dbProvider,
        ...collectionProviders,
      ],
    };
  }
}
