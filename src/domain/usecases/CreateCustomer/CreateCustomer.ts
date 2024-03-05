import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '@/domain/ports/repositories/Customer'
import { ICreateCustomerUseCase, CreateCustomerDTO } from '@/domain/usecases'
import { Customer } from '@/domain/entities/Customer'
import {
  MissingEmailError,
  MissingNameError,
  MissingNecessaryDataError,
  CustomerAlreadyExistsError,
} from '@/domain/errors'

@injectable()
export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(
    @inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async create(params: CreateCustomerDTO): Promise<Customer> {
    this.validateParams(params)

    const { name, email, documentNumber } = params

    const customer = new Customer({ name, email, documentNumber })

    await this.checkIfCustomerAlreadyExists(customer)

    const isCreated = await this.customerRepository.create(customer)

    if (!isCreated) throw new Error('Customer not created')

    const createdCostumer = await this.customerRepository.getById(customer.id)

    return createdCostumer!
  }

  private validateParams(params: CreateCustomerDTO) {
    if (params.name && !params.email) throw new MissingEmailError()

    if (params.email && !params.name) throw new MissingNameError()

    if (!params.email && !params.name && !params.documentNumber)
      throw new MissingNecessaryDataError(
        'Missing necessary data: name and email or documentNumber',
      )
  }

  private async checkIfCustomerAlreadyExists(customer: Customer) {
    if (customer.documentNumber) {
      const customerExists = await this.customerRepository.getByDocumentNumber(
        customer.documentNumber,
      )

      if (customerExists) throw new CustomerAlreadyExistsError()
    }

    if (customer.email) {
      const customerExists = await this.customerRepository.getByEmail(customer.email)

      if (customerExists) throw new CustomerAlreadyExistsError()
    }
  }
}
