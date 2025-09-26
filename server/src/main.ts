import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { apiReference } from "@scalar/nestjs-api-reference"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })

  // Swagger & Scalar config
  const config = new DocumentBuilder()
    .setTitle("Booky app API")
    .setDescription("This is the backend API of the 'Booky' app.")
    .addServer("http://localhost:3000/api")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "bearer", // 🔑 This name matches @ApiBearerAuth() in controller
    )
    .build()
  const doc = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("api/swagger", app, doc, {
    jsonDocumentUrl: "api/swagger/json",
  })

  app.use(
    "/api/reference",
    apiReference({
      content: doc,
      authentication: {
        preferredSecurityScheme: "bearer",
      },
      theme: "deepSpace",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  )

  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
