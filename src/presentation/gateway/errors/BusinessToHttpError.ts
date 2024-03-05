import { BusinessError, BusinessErrorType } from '@/domain/errors'
import {
  BadRequest,
  InternalServerError,
  Conflict,
  HttpError,
  NotFound,
} from '@/presentation/gateway/errors'

export function BusinessToHttpError(error: BusinessError): HttpError {
  switch (error.type) {
  case BusinessErrorType.AlreadyExists:
    return new Conflict(error.message)

  case BusinessErrorType.InvalidParam:
  case BusinessErrorType.MissingNecessaryData:
    return new BadRequest(error.message)

  case BusinessErrorType.NotFound:
    return new NotFound(error.message)

  case BusinessErrorType.Unexpected:
  default:
    return new InternalServerError(error.message)
  }
}
