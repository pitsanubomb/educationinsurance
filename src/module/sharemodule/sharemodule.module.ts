import { Module } from '@nestjs/common'
import { JwtToken } from './jwt/jwttoken'

Module({
  imports: [JwtToken],
  providers: [JwtToken],
  exports: [JwtToken],
})

export class ShareModule {}
