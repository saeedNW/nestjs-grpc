import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
	PRODUCTS_PACKAGE_NAME,
	PRODUCTS_SERVICE_NAME,
	ProductsServiceClient,
} from 'types/proto/products';

@Controller('product')
export class ProductController implements OnModuleInit {
	constructor(@Inject(PRODUCTS_PACKAGE_NAME) private readonly client: ClientGrpc) {}

	private productService: ProductsServiceClient;

	onModuleInit() {
		this.productService = this.client.getService<ProductsServiceClient>(PRODUCTS_SERVICE_NAME);
	}

	@Get()
	findOne() {
		return this.productService.getProduct({ id: 1 });
	}
}
