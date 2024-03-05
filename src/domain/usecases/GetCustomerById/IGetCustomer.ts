import { Customer } from '@/domain/entities/Customer'
import { GetCustomerByIdDTO } from '@/domain/usecases'

export interface IGetCustomerByIdUseCase {
  get: (params: GetCustomerByIdDTO) => Promise<Customer>
}
