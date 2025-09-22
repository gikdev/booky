import { ClassTransformOptions, plainToInstance } from "class-transformer"

export function toDto<T, V>(
  cls: new (...args: any[]) => T,
  plain: V,
  options?: ClassTransformOptions,
): T {
  return plainToInstance(cls, plain, {
    excludeExtraneousValues: true,
    ...options,
  })
}
