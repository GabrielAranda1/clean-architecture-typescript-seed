import { inject, injectable } from 'tsyringe'
import { IGetProductsByIdsUseCase, GetProductsByIdsDTO } from '@/domain/usecases'
import { Product } from '@/domain/entities/Product'
import { IProductRepository } from '@/domain/ports/repositories/Product'
import { MissingNecessaryDataError } from '@/domain/errors'

@injectable()
export class GetProductsByIdsUseCase implements IGetProductsByIdsUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async get(params: GetProductsByIdsDTO): Promise<Product[]> {
    if (!params.productIds) throw new MissingNecessaryDataError('Missing params: ids')

    const productIds = params.productIds.split(',')

    const products = await this.productRepository.getByIds(productIds)

    return products
  }
}
