const schedule = require('node-schedule')
import { MessageEmbed, WebhookClient } from 'discord.js'
import { ShopItem } from 'types'
import { addSpaceEveryCharacter, formatHoursToDays } from '@/libs/helpers'

const { WEBHOOK_ID, WEBHOOK_TOKEN } = process.env

if (!WEBHOOK_ID || !WEBHOOK_TOKEN) {
  throw new Error('Missing environment variables')
}

const webhookClient = new WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN)

export default async function logPurchase(
  purchaseId: string,
  id: string,
  item: ShopItem
): Promise<void> {
  try {
    const embed = new MessageEmbed()
      .setTitle(`Rachunek`)
      .addField(
        'Przedmiot',
        `Nazwa: ${item.title}${
          item?.duration
            ? `\nWygaśnie za: ${formatHoursToDays(item.duration)}`
            : ''
        }\nCena: ${addSpaceEveryCharacter(
          item.price
        )} <:uddiament:922146732060594207>\n\n`
      )
      .addField(
        'Zamówienie',
        `Numer zamówienia: ${purchaseId}\n${
          item.author
            ? `Wykonawca: <@${item.author?.id}>\nMarża: ${
                (item.price / 100) * 10
              } (10%)\n`
            : ''
        }Kupujący: <@${id}>`
      )
      .setThumbnail('https://cdn-icons-png.flaticon.com/512/314/314470.png')
      .setColor('#0F8CFF')

    await webhookClient.send(
      `Dziękujemy za zakupy w sklepie, <@${id}>! <a:pepeclap2:914171930012180491> ${
        item.author ? `<@${item.author?.id}>` : ''
      }`,
      embed
    )

    if (item?.duration && item.duration > 1) {
      let date = new Date()
      date.setHours(date.getHours() + item.duration)

      await schedule.scheduleJob(purchaseId, date, () => {
        webhookClient.send(
          `<@${id}> Twoje zamówienie **${purchaseId}** wygasło!`
        )
        schedule.cancelJob(purchaseId)
      })
    }
  } catch (error) {
    console.error(error)
  }
}
