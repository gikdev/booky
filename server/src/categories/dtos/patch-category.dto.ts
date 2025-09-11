import { PartialType } from "@nestjs/swagger"
import { BaseCategoryDto } from "./base-category.dto"

export class PatchCategoryDto extends PartialType(BaseCategoryDto) {}
