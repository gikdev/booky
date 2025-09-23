import { ClassTransformOptions } from "class-transformer"

export function getDefaultClassTransformOptions(
  options?: ClassTransformOptions,
) {
  return { excludeExtraneousValues: true, ...options }
}
