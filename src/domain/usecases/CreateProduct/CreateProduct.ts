import { inject, injectable } from 'tsyringe'
import { CreateProductDTO } from '@/domain/usecases'
import { MissingNecessaryDataError, InvalidParamError } from '@/domain/errors'
import { Category, Product } from '@/domain/entities/Product'
import { IProductRepository } from '@/domain/ports/repositories/Product'
import { ICreateProductUseCase } from './ICreateProduct'

@injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async create(params: CreateProductDTO): Promise<Product> {
    this.validateParams(params)

    const { name, category, description, price, imageLink } = params

    const product = new Product({
      name,
      category: category as Category,
      description,
      price,
      imageLink,
    })

    const isCreated = await this.productRepository.create(product)

    if (!isCreated) throw new Error('Product not created')

    const createdProduct = await this.productRepository.getById(product.id)

    return createdProduct!
  }

  private validateParams(params: CreateProductDTO) {
    const missingData: string[] = []

    for (const key in params) {
      if (!params[key as keyof typeof params]) missingData.push(key)
    }

    if (missingData.length > 0)
      throw new MissingNecessaryDataError(`Missing necessary data: ${missingData.join(', ')}`)

    const isValidCategory = Object.values(Category).includes(params.category as Category)

    if (!isValidCategory) throw new InvalidParamError('Invalid param: category')
  }
}
