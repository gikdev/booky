import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Profile } from "../profile.entity"
import { Repository } from "typeorm"
import { UpdateProfileDto } from "../dtos/update-profile.dto"
import { CreateProfileDto } from "../dtos/create-profile.dto"

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepo: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    let profile = this.profilesRepo.create(createProfileDto)
    profile = await this.profilesRepo.save(profile)
    return profile
  }

  async updateById(id: Profile["id"], updateProfileDto: UpdateProfileDto) {
    let profile = await this.profilesRepo.findOneBy({ id })
    if (!profile)
      throw new NotFoundException(`Profile with ID: ${id} was not found!`)

    profile.bio = updateProfileDto.bio
    profile.birthdate = updateProfileDto.birthdate
    profile.location = updateProfileDto.location

    profile = await this.profilesRepo.save(profile)
    return profile
  }
}
