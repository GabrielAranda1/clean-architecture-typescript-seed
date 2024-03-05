import { Product } from '@/domain/entities/Product'
import { GetProductByIdDTO } from '@/domain/usecases'

export interface IGetProductByIdUseCase {
  get: (params: GetProductByIdDTO) => Promise<Product>
}
