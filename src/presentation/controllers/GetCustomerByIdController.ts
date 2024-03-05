import { inject, injectable } from 'tsyringe'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'
import { ok } from '@/presentation/adapters'
import { IGetCustomerByIdUseCase } from '@/domain/usecases'

@injectable()
export class GetCustomerByIdController implements IController {
  constructor(
    @inject('IGetCustomerByIdUseCase')
    readonly getCustomerByIdUseCase: IGetCustomerByIdUseCase,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { customerId } = httpRequest.params

    const result = await this.getCustomerByIdUseCase.get({ customerId })

    return ok(result)
  }
}
