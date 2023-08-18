import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
// import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import LoggerMiddleware from './logger/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    // DatabaseModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
