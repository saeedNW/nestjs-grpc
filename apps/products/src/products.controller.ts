import { Controller } from '@nestjs/common';
import {
	ProductRequest,
	ProductResponse,
	ProductsServiceController,
	ProductsServiceControllerMethods,
} from 'types/proto/products';
import { ProductsService } from './products.service';

@Controller('products')
@ProductsServiceControllerMethods()
export class ProductsController implements ProductsServiceController {
	constructor(private readonly productsService: ProductsService) {}

	getProduct(request: ProductRequest): Promise<ProductResponse> {
		return this.productsService.getProduct(request);
	}
}
