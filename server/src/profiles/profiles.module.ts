import { Module } from "@nestjs/common"
import { ProfilesController } from "./profiles.controller"
import { ProfilesService } from "./providers/profiles.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Profile } from "./profile.entity"

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [TypeOrmModule.forFeature([Profile])],
})
export class ProfilesModule {}
