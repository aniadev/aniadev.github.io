import { BaseRepository } from '@/services/base'
import request from '@/services/configs/axios.config'

export default class UserRepository extends BaseRepository {
  constructor() {
    super('users')
  }

  async getAllUsers(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}`)
      console.log('>>> / file: index.ts:13 / rs', rs)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
