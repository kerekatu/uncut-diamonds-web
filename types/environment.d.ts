namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DISCORD_CLIENT_ID: string
    DISCORD_CLIENT_SECRET: string
    DISCORD_SERVER_ID: string
    FAUNADB_SECRET: string
    UNBELIEVABOAT_TOKEN: string
    UNBELIEVABOAT_APP_ID: string
    AUTH_SECRET: string
    NEXTAUTH_URL: string
  }
}
