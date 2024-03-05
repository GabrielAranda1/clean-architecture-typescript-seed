import { singleton } from 'tsyringe'
import { BusinessError } from '@/domain/errors'
import { IHttpResponse } from '@/presentation/interfaces'
import { BusinessToHttpError } from '@/presentation/gateway/errors'

@singleton()
export class HttpErrorHandler {
  handle(error: Error): IHttpResponse {
    if (error instanceof BusinessError) {
      const parsedError = BusinessToHttpError(error)

      return {
        statusCode: parsedError.statusCode,
        message: parsedError.message,
        body: {
          details: parsedError.details,
        },
      }
    }

    return {
      statusCode: 500,
      message: 'Internal server error',
      body: {
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
      },
    }
  }
}
