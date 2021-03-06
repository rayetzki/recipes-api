import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipes/recipes.module';
import { LoggerMiddleware } from './app.logger';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [__dirname.concat('/../**/*.entity.js')]
    }),
    UserModule,
    AuthModule,
    RecipeModule,
    FavouritesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({ xssFilter: true });
    CorsMiddleware.configure({ origin: [process.env.LOCALHOST_URL, process.env.FRONTEND_URL] });
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(HelmetMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
