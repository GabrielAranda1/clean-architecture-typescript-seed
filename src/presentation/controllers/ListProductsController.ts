import { inject, injectable } from 'tsyringe'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'
import { ok } from '@/presentation/adapters'
import { IListProductsUseCase } from '@/domain/usecases'

@injectable()
export class ListProductsController implements IController {
  constructor(
    @inject('IListProductsUseCase')
    readonly listProductsUseCase: IListProductsUseCase,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, category, description, price } = httpRequest.query

    const result = await this.listProductsUseCase.list({
      name,
      category,
      description,
      price,
    })

    return ok(result)
  }
}
