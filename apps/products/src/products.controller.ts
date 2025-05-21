import { Controller } from '@nestjs/common';
import {
	ProductRequest,
	ProductResponse,
	ProductsServiceController,
	ProductsServiceControllerMethods,
} from 'types/proto/products';
import { ProductsService } from './products.service';

/**
 * Products controller responsible for handling product-related HTTP requests
 * Implements the gRPC ProductsServiceController interface
 * Uses ProductsService for business logic implementation
 * Handles product retrieval operations through gRPC endpoints
 */
@Controller('products')
@ProductsServiceControllerMethods()
export class ProductsController implements ProductsServiceController {
	constructor(private readonly productsService: ProductsService) {}

	/**
	 * Retrieves a product based on the provided request
	 * @param request - ProductRequest containing search criteria
	 * @returns Promise<ProductResponse> containing the requested product information
	 */
	getProduct(request: ProductRequest): Promise<ProductResponse> {
		return this.productsService.getProduct(request);
	}
}
