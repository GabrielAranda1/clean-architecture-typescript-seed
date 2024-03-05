import { inject, injectable } from 'tsyringe'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'
import { ok } from '@/presentation/adapters'
import { IGetProductsByIdsUseCase } from '@/domain/usecases'
@injectable()
export class GetProductsByIdsController implements IController {
  constructor(
    @inject('IGetProductsByIdsUseCase')
    readonly getProductsByIdsUseCase: IGetProductsByIdsUseCase,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const productIds = httpRequest.query.ids

    const result = await this.getProductsByIdsUseCase.get({ productIds })

    return ok(result)
  }
}
