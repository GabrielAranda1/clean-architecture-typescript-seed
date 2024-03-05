import { HttpError } from '@/presentation/gateway/errors'

export class BadRequest extends HttpError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 400, details)
  }
}
