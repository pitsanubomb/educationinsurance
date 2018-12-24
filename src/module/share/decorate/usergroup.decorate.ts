import { ReflectMetadata } from '@nestjs/common'

export const Usergroups = (...usergroups: string[]) => ReflectMetadata('usergroups', usergroups)
