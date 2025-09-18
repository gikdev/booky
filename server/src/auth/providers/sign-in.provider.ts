import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common"
import { SignInDto } from "../dtos/signin.dto"
import { UsersService } from "src/users/providers/users.service"
import { HashingProvider } from "./hashing.provider"
import { JwtService } from "@nestjs/jwt"
import type { ConfigType } from "@nestjs/config"
import { jwtConfig } from "../config/jwt.config"

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  async signin(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmailOrNull(signInDto.email)

    if (!user) throw new UnauthorizedException("User doesn't exist.")

    let isEqual: boolean = false

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      )
    } catch (err) {
      throw new InternalServerErrorException(err, {
        description: "Couldn't compare passwords",
      })
    }

    if (!isEqual) throw new UnauthorizedException("Incorrect credentials...")

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    )

    return {
      userId: user.id,
      accessToken,
    }
  }
}
