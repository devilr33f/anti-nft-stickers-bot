import { oneLine } from 'common-tags'

import config from '@/config.js'

import { bot } from './bot.js'
import { provideLogger } from './utilities/logger.js'

const init = async () => {
  provideLogger('index').info(oneLine`
    starting
    ${config.package.name}
    (${config.package.version})
    in ${config.package.mode} mode...
  `)

  bot.start()
}

init()
