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
import { GenerateTokensProvider } from "./providers/generate-tokens.provider"
import { RefreshTokensProvider } from "./providers/refresh-tokens.provider"
import { AuthGuard } from "./guards/auth.guard"
import { SignUpProvider } from "./providers/sign-up.provider"

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
    // { provide: APP_GUARD, useClass: AuthenticationGuard },
    // AccessTokenGuard,
    { provide: APP_GUARD, useClass: AuthGuard },
    GenerateTokensProvider,
    RefreshTokensProvider,
    SignUpProvider,
  ],
})
export class AuthModule {}
