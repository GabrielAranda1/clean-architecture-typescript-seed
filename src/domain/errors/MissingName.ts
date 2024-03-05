import { BusinessError, BusinessErrorType } from '@/domain/errors'

export class MissingNameError extends BusinessError {
  constructor(message?: string) {
    super(BusinessErrorType.MissingNecessaryData)

    this.name = 'MissingNameError'
    this.message = message ?? 'Name is required'
  }
}
