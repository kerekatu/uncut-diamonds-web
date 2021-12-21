export const getUsers = async () => {
  try {
    const response = await fetch(
      `https://unbelievaboat.com/api/v1/guilds/${process.env.DISCORD_SERVER_ID}/users`,
      {
        headers: {
          Authorization: process.env.UNBELIEVABOAT_TOKEN,
        },
      }
    )
    const users = await response.json()

    if (!users) return { status: '404', error: 'No users found' }

    return { status: '200', data: users }
  } catch (error) {
    return { status: '400', error }
  }
}
