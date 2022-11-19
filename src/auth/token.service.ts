import { sign } from 'jsonwebtoken'

import { PayloadDataDto } from './dtos/payload-data.dto'

class TokenService {
  generateToken(payload: PayloadDataDto): string {
    const secret = process.env.JWT_SECRET || 'secret'
    const token = sign(payload, secret, { expiresIn: '10d' })

    return token
  }
}

export default new TokenService()
