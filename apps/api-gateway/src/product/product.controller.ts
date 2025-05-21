import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
	PRODUCTS_PACKAGE_NAME,
	PRODUCTS_SERVICE_NAME,
	ProductsServiceClient,
} from 'types/proto/products';

/**
 * Product Controller
 *
 * This controller handles HTTP requests related to products by acting as an API Gateway.
 * It communicates with a gRPC Product service using protocol buffers.
 *
 * The controller:
 * - Implements OnModuleInit to set up the gRPC client connection on initialization
 * - Uses dependency injection to receive the gRPC client
 * - Provides REST endpoints that internally communicate with the Product microservice
 * - Transforms HTTP requests into gRPC calls
 */
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
