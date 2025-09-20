import { forwardRef, Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./providers/auth.service"
import { UsersModule } from "src/users/users.module"
import { HashingProvider } from "./providers/hashing.provider"
import { BcryptProvider } from "./providers/bcrypt.provider"
import { SignInProvider } from "./providers/sign-in.provider"
import { ConfigModule } from "@nestjs/config"
import { jwtConfig } from "./config/jwt.config"
import { JwtModule } from "@nestjs/jwt"
import { APP_GUARD } from "@nestjs/core"
import { AccessTokenGuard } from "./guards/access-token/access-token.guard"
import { AuthenticationGuard } from "./guards/authentication/authentication.guard"

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    forwardRef(() => UsersModule),
  ],
  exports: [HashingProvider],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInProvider,
    { provide: HashingProvider, useClass: BcryptProvider },
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
  ],
})
export class AuthModule {}
