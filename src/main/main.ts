import 'reflect-metadata'
import { config } from 'dotenv'

config()

import { initializeContainer } from '@/main/factories'
import { startHttpServer } from '@/presentation/gateway/httpServer'

async function startApp() {
  await initializeContainer()
  startHttpServer()
}

startApp().catch((error) => {
  console.error('Failed to start app:', error)
})
