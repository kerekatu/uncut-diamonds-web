const schedule = require('node-schedule')
import { Intents, MessageEmbed, WebhookClient } from 'discord.js'
import { ShopItem } from 'types'
import { addSpaceEveryCharacter, formatHoursToDays } from '@/libs/helpers'

const { WEBHOOK_ID, WEBHOOK_TOKEN } = process.env

if (!WEBHOOK_ID || !WEBHOOK_TOKEN) {
  throw new Error('Missing environment variables')
}

const webhookClient = new WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN)

export default function logPurchase(
  purchaseId: string,
  id: string,
  item: ShopItem
): void {
  const embed = new MessageEmbed()
    .setTitle('Rachunek')
    .addField(
      `${item.title}`,
      `Wygaśnie za: ${
        item.duration ? formatHoursToDays(item.duration) : 'Nigdy'
      }\nCena: ${addSpaceEveryCharacter(
        item.price
      )} <:uddiament:922146732060594207>\n\nID: ${purchaseId}`
    )
    .setThumbnail('https://cdn-icons-png.flaticon.com/512/314/314470.png')
    .setColor('#0F8CFF')

  webhookClient.send(
    `<@${id}> dziękujemy za zakupy w sklepie! <:uddiament:922146732060594207> Twoje zamówienie zostanie niedługo przetworzone...`,
    embed
  )

  if (item?.duration && item.duration > 1) {
    let date = new Date()
    date.setHours(date.getHours() + item.duration)

    schedule.scheduleJob(purchaseId, date, () => {
      webhookClient.send(`<@${id}> Twoje zamówienie **${purchaseId}** wygasło!`)
      schedule.cancelJob(purchaseId)
    })
  }
}
