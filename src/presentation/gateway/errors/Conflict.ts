import { HttpError } from '@/presentation/gateway/errors'

export class Conflict extends HttpError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 409, details)
  }
}
