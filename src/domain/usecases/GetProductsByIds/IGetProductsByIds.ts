import { Product } from '@/domain/entities/Product'
import { GetProductsByIdsDTO } from '@/domain/usecases'

export interface IGetProductsByIdsUseCase {
  get: (params: GetProductsByIdsDTO) => Promise<Product[]>
}
