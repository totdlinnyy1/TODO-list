import { sign, verify } from 'jsonwebtoken'

import { PayloadDataDto } from './dtos/payload-data.dto'

class TokenService {
  generateToken(payload: PayloadDataDto): string {
    const secret = process.env.JWT_SECRET || 'secret'
    const token = sign(payload, secret, { expiresIn: '10d' })

    return token
  }

  validateToken(token: string): string | null {
    try {
      const secret = process.env.JWT_SECRET || 'secret'
      const payload = verify(token, secret)
      return (payload as PayloadDataDto).sub
    } catch (e) {
      return null
    }
  }
}

export default new TokenService()
