import * as jsonwebtoken
export class Jwt {
  public jwtGenerate(user) {
    const toDay = new Date()
    const exp = new Date(toDay)

    exp.setDate(toDay.getDate()) + 60

    return jwt.sign({

    })
  }
}
