import { registerAs } from "@nestjs/config"

export const jwtConfig = registerAs("jwt", () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? "3600", 10),
}))
