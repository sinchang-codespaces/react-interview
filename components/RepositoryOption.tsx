import { FC } from 'react'
import { Combobox } from '@headlessui/react'
import {
  ChipIcon,
  InboxInIcon,
  ShareIcon,
  StarIcon,
} from '@heroicons/react/outline'
import { classNames } from './Example'
import Image from 'next/image'

/**
 * 仓库数据的类型
 */
export type Repository = {
  id: string
  name: string
  full_name: string
  open_issues_count: number
  stargazers_count: number
  forks_count: number
  url: string
  language: string
  owner: {
    login: string
    avatar_url: string
  }
}

interface RepositoryOptionProps {
  repository: Repository
}

const RepositoryOption: FC<RepositoryOptionProps> = ({
  repository: {
    name,
    owner: { avatar_url, login },
    language,
    stargazers_count,
    open_issues_count,
    forks_count,
  },
}) => {
  return (
    <Combobox.Option
      value={name}
      className={({ active }) =>
        classNames(
          'flex flex-col cursor-default select-none justify-center px-4 py-2 space-y-1.5',
          active ? 'bg-indigo-300/20 text-white' : 'text-gray-300'
        )
      }
    >
      {({ active }) => (
        <>
          <header className="flex items-center">
            <ChipIcon
              className={classNames(
                'h-5 w-5 flex-none',
                active ? 'text-white' : 'text-gray-200'
              )}
              aria-hidden="true"
            />
            <span className="ml-1 font-bold flex-auto truncate">{name}</span>
          </header>

          <footer className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Owner */}
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded-full overflow-hidden">
                  <Image
                    src={avatar_url}
                    alt="User Avatar"
                    layout="responsive"
                    width={100}
                    height={100}
                  />
                </span>
                <span className="font-medium">{login}</span>
              </span>
              {/* Language */}
              {language ? (
                <span className="flex items-center space-x-1">
                  <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="font-medium">{language}</span>
                </span>
              ) : null}
            </div>
            <div className="flex items-center space-x-2.5">
              {/* Stargazers */}
              <span className="flex items-center space-x-0.5">
                <StarIcon className="w-4 h-4" />
                <span>{stargazers_count} stars</span>
              </span>
              {/* Issues */}
              <span className="flex items-center space-x-0.5">
                <InboxInIcon className="w-4 h-4" />
                <span>{open_issues_count} issues</span>
              </span>
              {/* Forks */}
              <span className="flex items-center space-x-0.5">
                <ShareIcon className="w-4 h-4" />
                <span>{forks_count} forks</span>
              </span>
            </div>
          </footer>
        </>
      )}
    </Combobox.Option>
  )
}

export default RepositoryOption
