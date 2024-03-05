import { Response, NextFunction } from 'express'
import { IHttpRequest, IHttpResponse } from '@/presentation/interfaces'

const adaptErrorHandler = (httpResponse: IHttpResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (req: IHttpRequest, res: Response, next: NextFunction) => {
    const envelop = {
      data: httpResponse.body,
      message: httpResponse.message,
    }

    return res.status(httpResponse.statusCode).json(envelop)
  }
}

export { adaptErrorHandler }
