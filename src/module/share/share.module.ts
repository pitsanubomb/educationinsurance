import { Module } from '@nestjs/common'
import { databaseConnect } from './connectdb'

@Module({
  providers: [...databaseConnect],
  exports: [...databaseConnect],
})
export class ShareModule {}
