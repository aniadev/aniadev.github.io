import { BaseRepository } from '@/services/base'
import request from '@/services/configs/axios.config'

export default class SettingRepository extends BaseRepository {
  constructor() {
    super('api/v1/user')
  }
}
