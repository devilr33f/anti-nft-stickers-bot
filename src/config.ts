import { existsSync } from 'fs'
import { loadEnvFile } from 'process'

import env from 'env-var'

if (existsSync('.env') || (process.env.NODE_ENV === 'development' && existsSync('.env.development'))) {
  loadEnvFile((process.env.NODE_ENV === 'development' && existsSync('.env.development')) ? '.env.development' : '.env')
}

export default {
  package: {
    name: env.get('npm_package_name').default('unknown').asString(),
    version: env.get('npm_package_version').default('unknown').asString(),
    mode: env.get('NODE_ENV').default('production').asString(),
  },
  botToken: env.get('BOT_TOKEN').required().asString(),
  shouldSendWarning: env.get('SHOULD_SEND_WARNING').default('true').asBool(),
}
