import { BaseRepositoryInterface } from '@/interfaces/services/services.interface'

export abstract class BaseRepository implements BaseRepositoryInterface {
  prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }
}
