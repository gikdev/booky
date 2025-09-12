import { registerAs } from "@nestjs/config"

export default registerAs("db", () => ({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  sync: process.env.DB_SYNC === "true",
  autoLoadEntities: process.env.DB_AUTOLOAD === "true",
}))
