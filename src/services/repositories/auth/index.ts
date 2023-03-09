import { BaseRepository } from '@/services/base'
import request from '@/services/configs/axios.config'

export default class AuthRepository extends BaseRepository {
  constructor() {
    super('api/v1/auth')
  }
}
