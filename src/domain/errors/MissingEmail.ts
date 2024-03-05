import { BusinessError, BusinessErrorType } from '@/domain/errors'

export class MissingEmailError extends BusinessError {
  constructor(message?: string) {
    super(BusinessErrorType.MissingNecessaryData)

    this.name = 'MissingEmailError'
    this.message = message ?? 'Email is required'
  }
}
