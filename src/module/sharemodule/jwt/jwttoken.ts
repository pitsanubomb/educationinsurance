import { User } from '../../user/entities/user.entity'
import * as jwt from 'jsonwebtoken'
import { JWTSECRET } from './jwtconfig'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtToken {
  public genToken(user: User) {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign(
      {
        id: user.uid,
        username: user.username,
        exp: exp.getTime() + 1000,
      },
      JWTSECRET,
    )
  }
}
