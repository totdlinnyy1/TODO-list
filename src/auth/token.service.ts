import { PayloadDataDto } from './dtos/payload-data.dto'
import jwt from 'jsonwebtoken'

class TokenService {
  generateToken(payload: PayloadDataDto): string {
    const secret = process.env.JWT_SECRET || 'secret'
    const token = jwt.sign(payload, secret, {expiresIn: '10d'})

    return token
  }
}

export default new TokenService()
