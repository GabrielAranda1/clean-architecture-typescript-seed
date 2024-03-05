import { container } from 'tsyringe'
import {
  CreateCustomerUseCase,
  CreateProductUseCase,
  GetCustomerByIdUseCase,
  GetProductByIdUseCase,
  ICreateCustomerUseCase,
  GetProductsByIdsUseCase,
  ICreateProductUseCase,
  IGetProductByIdUseCase,
  IGetProductsByIdsUseCase,
  IListProductsUseCase,
  IUpdateProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '../domain/usecases'
import { MongoDbClient } from '../infra/database/mongo'
import { env } from './env'
import { CustomerRepository, ProductRepository } from '@/infra/repositories'

export async function initializeContainer() {
  const mongoDbClientInstance = await MongoDbClient.connect(env.mongoUrl)

  container.registerInstance('MongoDbClient', mongoDbClientInstance)

  container.registerSingleton('ICustomerRepository', CustomerRepository)
  container.registerSingleton('IProductRepository', ProductRepository)

  container.register<ICreateCustomerUseCase>('ICreateCustomerUseCase', CreateCustomerUseCase)
  container.register<GetCustomerByIdUseCase>('IGetCustomerByIdUseCase', GetCustomerByIdUseCase)
  container.register<ICreateProductUseCase>('ICreateProductUseCase', CreateProductUseCase)
  container.register<IListProductsUseCase>('IListProductsUseCase', ListProductsUseCase)
  container.register<IUpdateProductUseCase>('IUpdateProductUseCase', UpdateProductUseCase)
  container.register<IGetProductByIdUseCase>('IGetProductByIdUseCase', GetProductByIdUseCase)
  container.register<IGetProductsByIdsUseCase>('IGetProductsByIdsUseCase', GetProductsByIdsUseCase)
}
