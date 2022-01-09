import { WebhookClient } from 'discord.js'
import { IShopItem } from 'types'

const { WEBHOOK_ID, WEBHOOK_TOKEN } = process.env

if (!WEBHOOK_ID || !WEBHOOK_TOKEN) {
  throw new Error('Missing environment variables')
}

const webhookClient = new WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN)

export default function logPurchase(id: string, item: IShopItem): void {
  webhookClient.send(
    `<@${id}> wydał/a pieniążki na: **${item.title}** <:pepepog:913174353208815686>`
  )
}
