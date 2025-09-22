import { Injectable } from "@nestjs/common"
import { SignInProvider } from "./sign-in.provider"
import { UsersService } from "src/users/providers/users.service"
import { CreateUserDto } from "src/users/dtos/create-user.dto"

@Injectable()
export class SignUpProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly signInProvider: SignInProvider,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)

    const { tokens } = await this.signInProvider.signin({
      email: createUserDto.email,
      password: createUserDto.password,
    })

    return { user, tokens }
  }
}
