import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { JWTSECRET } from '../jwt/jwtconfig'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    if (request) {
      if (!request.headers.authorization) {
        throw new HttpException(
          'กรุณาลงชื่อเข้าใช้งาน',
          HttpStatus.UNAUTHORIZED,
        )
      }
      request.user = await this.validateToken(request.headers.authorization)
      return true
    }
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    const jwtToken = auth.split(' ')[1]

    try {
      const jwtDecode = jwt.verify(jwtToken, JWTSECRET)
      return jwtDecode
    } catch (error) {
      const message = 'Token error: ' + (error.message || error.name)
      throw new HttpException(message, HttpStatus.UNAUTHORIZED)
    }
  }
}
