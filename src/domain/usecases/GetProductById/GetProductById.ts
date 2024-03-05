import { inject, injectable } from 'tsyringe'
import { GetProductByIdDTO, IGetProductByIdUseCase } from '@/domain/usecases'
import { NotFoundError } from '@/domain/errors'
import { Product } from '@/domain/entities/Product'
import { IProductRepository } from '@/domain/ports/repositories/Product'

@injectable()
export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async get(params: GetProductByIdDTO): Promise<Product> {
    const product = await this.productRepository.getById(params.productId)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    return product
  }
}
