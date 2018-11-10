import { User } from '../../user/entities/user.entity'
import * as jwt from 'jsonwebtoken'
import { JWTSECRET } from './jwtconfig'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtToken {
  public genToken(user: User) {
    const exp = new Date()
    exp.setDate(exp.getDate() + 1)
    const expTime = Math.floor(new Date(exp).getTime() / 1000)
    return jwt.sign(
      {
        id: user.uid,
        username: user.username,
        role: user.usergroup,
        exp: expTime,
      },
      JWTSECRET,
    )
  }
}
