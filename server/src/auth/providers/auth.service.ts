import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { UsersService } from "src/users/providers/users.service"
import { LogInDto } from "../dtos/login.dto"
import { SignInDto } from "../dtos/signin.dto"
import { SignInProvider } from "./sign-in.provider"

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly signInProvider: SignInProvider,
  ) {}

  async login(logInDto: LogInDto) {
    const user = await this.usersService.findOneByEmailOrNull(logInDto.email)
    if (!user || user.password !== logInDto.password)
      throw new UnauthorizedException("Invalid credentials")
    return user
  }

  signin(signInDto: SignInDto) {
    return this.signInProvider.signin(signInDto)
  }
}
