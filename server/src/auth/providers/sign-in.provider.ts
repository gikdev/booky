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
import { GenerateTokensProvider } from "./generate-tokens.provider"

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,
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

    const { accessToken, refreshToken } =
      await this.generateTokensProvider.generateTokens(user)

    return { accessToken, refreshToken }
  }
}
