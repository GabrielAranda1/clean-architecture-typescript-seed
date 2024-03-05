import { HttpError } from '@/presentation/gateway/errors'

export class NotFound extends HttpError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 404, details)
  }
}
