import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "node:path"
import { BooksModule } from "./books/books.module"
import { UsersModule } from "./users/users.module"
import { ProfilesModule } from "./profiles/profiles.module"
import { CategoriesModule } from "./categories/categories.module"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        synchronize: true,
        port: 5432,
        username: "postgres",
        password: "mmsfllfbns",
        host: "localhost",
        database: "booky",
        autoLoadEntities: true,
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
