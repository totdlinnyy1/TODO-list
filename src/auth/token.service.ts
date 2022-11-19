import { sign, verify } from 'jsonwebtoken'

import { PayloadDataDto } from './dtos/payload-data.dto'

class TokenService {

  // Generating jwt token
  generateToken(payload: PayloadDataDto): string {
    console.log('Start generating jwt token: ', payload)
    const secret = process.env.JWT_SECRET || 'secret'
    const token = sign(payload, secret, { expiresIn: '10d' })

    console.log('Return token: ', token)
    return token
  }

  // Validating jwt token
  validateToken(token: string): string | null {
    try {
      console.log('Start validating jwt token: ', token)
      const secret = process.env.JWT_SECRET || 'secret'
      const payload = verify(token, secret)
      console.log('Return id from token: ', (payload as PayloadDataDto).sub)
      return (payload as PayloadDataDto).sub
    } catch (e) {
      console.warn('Invalid token warn')
      return null
    }
  }
}

export default new TokenService()
