import { inject, injectable } from 'tsyringe'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'
import { ok } from '@/presentation/adapters'
import { IUpdateProductUseCase } from '@/domain/usecases'

@injectable()
export class UpdateProductController implements IController {
  constructor(
    @inject('IUpdateProductUseCase')
    readonly updateProductUseCase: IUpdateProductUseCase,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, category, price, description } = httpRequest.body
    const { productId } = httpRequest.params

    const result = await this.updateProductUseCase.update({
      productId,
      name,
      category,
      price,
      description,
    })

    return ok(result)
  }
}
