import { Customer } from '@/domain/entities/Customer'
import { CreateCustomerDTO } from '@/domain/usecases'

export interface ICreateCustomerUseCase {
  create: (params: CreateCustomerDTO) => Promise<Customer>
}
