import { BusinessError, BusinessErrorType } from '@/domain/errors'

export class InvalidParamError extends BusinessError {
  constructor(message?: string) {
    super(BusinessErrorType.InvalidParam)

    this.name = 'InvalidParamError'
    this.message = message ?? 'Invalid param.'
  }
}
