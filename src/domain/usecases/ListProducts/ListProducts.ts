import { inject, injectable } from 'tsyringe'
import { ListProductsDTO, IListProductsUseCase } from '@/domain/usecases'
import { Category, Product } from '@/domain/entities/Product'
import { InvalidParamError } from '@/domain/errors'
import { IProductRepository } from '@/domain/ports/repositories/Product'

@injectable()
export class ListProductsUseCase implements IListProductsUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async list(params: ListProductsDTO): Promise<Product[]> {
    if (params.category) {
      const isValidCategory = Object.values(Category).includes(params.category as Category)

      if (!isValidCategory) throw new InvalidParamError('Invalid param: category')
    }

    const { name, category, description, price } = params

    const products = await this.productRepository.list({
      category: category as Category,
      name,
      description,
      price,
    })

    return products
  }
}
