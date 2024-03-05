import { inject, injectable } from 'tsyringe'
import { UpdateProductDTO, IUpdateProductUseCase } from '@/domain/usecases'
import { Category, Product } from '@/domain/entities/Product'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { IProductRepository } from '@/domain/ports/repositories/Product'

@injectable()
export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async update(params: UpdateProductDTO): Promise<Product> {
    this.validateParams(params)

    const { name, category, description, price, productId } = params

    const isUpdated = await this.productRepository.update({
      id: productId,
      name,
      category: category as Category,
      description,
      price,
    })

    if (!isUpdated) throw new NotFoundError('Product not found')

    const updatedProduct = await this.productRepository.getById(productId)

    return updatedProduct!
  }

  private validateParams(params: UpdateProductDTO) {
    if (params.category) {
      const isValidCategory = Object.values(Category).includes(params.category as Category)

      if (!isValidCategory) throw new InvalidParamError('Invalid param: category')
    }
  }
}
