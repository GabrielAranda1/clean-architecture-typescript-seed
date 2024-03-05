import { inject, injectable } from 'tsyringe'
import { GetCustomerByIdDTO, IGetCustomerByIdUseCase } from '@/domain/usecases'
import { Customer } from '@/domain/entities/Customer'
import { ICustomerRepository } from '@/domain/ports/repositories/Customer'
import { NotFoundError } from '@/domain/errors'

@injectable()
export class GetCustomerByIdUseCase implements IGetCustomerByIdUseCase {
  constructor(
    @inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async get(params: GetCustomerByIdDTO): Promise<Customer> {
    const customer = await this.customerRepository.getById(params.customerId)

    if (!customer) {
      throw new NotFoundError('Customer not found')
    }

    return customer
  }
}
