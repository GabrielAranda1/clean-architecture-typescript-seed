import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '@/presentation/adapters'
import {
  CreateProductController,
  ListProductsController,
  UpdateProductController,
  GetProductByIdController,
  GetProductsByIdsController,
} from '@/presentation/controllers'

function registerProductRoutes(router: Router) {
  router.post('/products', adaptRoute(container.resolve(CreateProductController)))
  router.get('/products', adaptRoute(container.resolve(ListProductsController)))
  router.patch('/products/:productId', adaptRoute(container.resolve(UpdateProductController)))
  router.get('/products/ids/', adaptRoute(container.resolve(GetProductsByIdsController)))
  router.get('/products/:productId', adaptRoute(container.resolve(GetProductByIdController)))

  return router
}

export { registerProductRoutes }
