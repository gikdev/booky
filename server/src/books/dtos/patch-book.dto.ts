import { PartialType } from "@nestjs/swagger"
import { BaseBookDto } from "./base-book.dto"

export class PatchBookDto extends PartialType(BaseBookDto) {}
