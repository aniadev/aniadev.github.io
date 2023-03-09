import SettingRepository from './repositories/setting'
import UserRepository from './repositories/user'

type RepositoryName = 'setting' | 'user'

export default function getRepository(name: RepositoryName): any {
  switch (name) {
    case 'setting':
      return new SettingRepository()
    case 'user':
      return new UserRepository()
  }
}
