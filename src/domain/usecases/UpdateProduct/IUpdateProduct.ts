import { Product } from '@/domain/entities/Product'
import { UpdateProductDTO } from '@/domain/usecases'

export interface IUpdateProductUseCase {
  update: (params: UpdateProductDTO) => Promise<Product>
}
