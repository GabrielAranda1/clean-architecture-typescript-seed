import { inject, injectable } from 'tsyringe'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'
import { ok } from '@/presentation/adapters'
import { IGetProductByIdUseCase } from '@/domain/usecases'

@injectable()
export class GetProductByIdController implements IController {
  constructor(
    @inject('IGetProductByIdUseCase')
    readonly getProductByIdUseCase: IGetProductByIdUseCase,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { productId } = httpRequest.params

    const result = await this.getProductByIdUseCase.get({ productId })

    return ok(result)
  }
}
