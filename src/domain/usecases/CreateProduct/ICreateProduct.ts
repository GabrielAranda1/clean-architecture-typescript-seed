import { Product } from '@/domain/entities/Product'
import { CreateProductDTO } from '@/domain/usecases'

export interface ICreateProductUseCase {
  create: (params: CreateProductDTO) => Promise<Product>
}
