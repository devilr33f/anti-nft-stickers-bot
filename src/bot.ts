import { Bot, TelegramError } from 'gramio'

import config from './config.js'
import { provideLogger } from './utilities/logger.js'

export const bot = new Bot(config.botToken)
export type BotType = typeof bot

bot.onStart(() => {
  provideLogger('bot').info('bot started')
})

bot.on('message', async (context) => {
  if (['channel', 'private'].includes(context.chat.type)) return

  if (!context.hasAttachmentType('sticker')) return
  if (context.attachment.setName && context.attachment.setName.includes('by_sticker_bot')) {
    const admins = await bot.api.getChatAdministrators({ chat_id: context.chat.id, suppress: true })
    if (!(admins instanceof TelegramError) && admins.find((admin) => admin.user.id === context.senderId)) return

    if (config.shouldSendWarning) await context.reply('No NFT stickers there!')
    context.delete()
  }
})
