import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   'mongodb+srv://sagarpanchal3690:Sagar%402002@cluster0.dea7ubt.mongodb.net/CRMBack?retryWrites=true&w=majority',
    // ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
