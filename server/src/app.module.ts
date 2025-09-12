import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "node:path"
import { BooksModule } from "./books/books.module"
import { UsersModule } from "./users/users.module"
import { ProfilesModule } from "./profiles/profiles.module"
import { CategoriesModule } from "./categories/categories.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import appConfig from "./config/app.config"
import dbConfig from "./config/db.config"
import envValidation from "./config/env.validation"

const ENV = process.env.NODE_ENV

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV ? `.env.${ENV}` : ".env",
      load: [appConfig, dbConfig],
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        synchronize: configService.get("db.sync"),
        port: configService.get("db.port"),
        username: configService.get("db.user"),
        password: configService.get("db.password"),
        host: configService.get("db.host"),
        database: configService.get("db.name"),
        autoLoadEntities: configService.get("db.autoLoadEntities"),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "client", "dist"),
    }),
    BooksModule,
    UsersModule,
    ProfilesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
