import { inject, injectable } from 'tsyringe'
import { created } from '@/presentation/adapters'
import { ICreateCustomerUseCase } from '@/domain/usecases'
import { IHttpResponse, IController, IHttpRequest } from '@/presentation/interfaces'

@injectable()
export class CreateCustomerController implements IController {
  constructor(
    @inject('ICreateCustomerUseCase')
    readonly createCustomerUseCase: ICreateCustomerUseCase,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, email, documentNumber } = httpRequest.body

    const result = await this.createCustomerUseCase.create({
      name,
      email,
      documentNumber,
    })

    return created(result, 'Customer created')
  }
}
