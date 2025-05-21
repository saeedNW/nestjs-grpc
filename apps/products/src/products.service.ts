import { Injectable } from '@nestjs/common';
import { ProductRequest, ProductResponse, ProductsServiceController } from 'types/proto/products';

@Injectable()
export class ProductsService implements ProductsServiceController {
	async getProduct(request: ProductRequest): Promise<ProductResponse> {
		return {
			id: 1,
			name: 'Product 1',
			price: 100,
		};
	}
}
