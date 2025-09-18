import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common"
import { CreateProfileDto } from "./dtos/create-profile.dto"
import { ProfilesService } from "./providers/profiles.service"
import { plainToInstance } from "class-transformer"
import { ProfileResponseDto } from "./dtos/profile-response.dto"
import { UpdateProfileDto } from "./dtos/update-profile.dto"
import { ApiOperation } from "@nestjs/swagger"

@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({ summary: "Create a profile" })
  @Post()
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    const profile = await this.profilesService.create(createProfileDto)
    return plainToInstance(ProfileResponseDto, profile, {
      excludeExtraneousValues: true,
    })
  }

  @ApiOperation({ summary: "Update profile by ID" })
  @Put("/:id")
  async updateProfileById(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profilesService.updateById(id, updateProfileDto)
    return plainToInstance(ProfileResponseDto, profile, {
      excludeExtraneousValues: true,
    })
  }
}
