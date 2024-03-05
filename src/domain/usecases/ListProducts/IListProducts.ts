import { Product } from '@/domain/entities/Product'
import { ListProductsDTO } from '@/domain/usecases'

export interface IListProductsUseCase {
  list: (params: ListProductsDTO) => Promise<Product[]>
}
