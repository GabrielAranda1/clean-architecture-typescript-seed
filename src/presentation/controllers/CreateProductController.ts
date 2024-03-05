import { inject, injectable } from 'tsyringe'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'
import { created } from '@/presentation/adapters'
import { ICreateProductUseCase } from '@/domain/usecases'

@injectable()
export class CreateProductController implements IController {
  constructor(
    @inject('ICreateProductUseCase')
    readonly createProductUseCase: ICreateProductUseCase,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, category, description, price, imageLink } = httpRequest.body

    const result = await this.createProductUseCase.create({
      name,
      category,
      description,
      price,
      imageLink,
    })

    return created(result, 'Product created')
  }
}
