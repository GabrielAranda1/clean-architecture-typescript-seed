import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '@/presentation/adapters'
import { CreateCustomerController, GetCustomerByIdController } from '@/presentation/controllers'

function registerCustomerRoutes(router: Router) {
  router.post('/customers', adaptRoute(container.resolve(CreateCustomerController)))
  router.get('/customers/:customerId', adaptRoute(container.resolve(GetCustomerByIdController)))

  return router
}

export { registerCustomerRoutes }
