import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { PRODUCTS_PACKAGE_NAME } from 'types/proto/products';
import { ProductController } from './product.controller';

@Module({
	imports: [
		// Register gRPC client module for product service communication
		// - Creates a gRPC client connection to the product microservice
		// - Uses the products proto package name for service identification
		// - Configures transport protocol as gRPC
		// - Specifies path to the products protobuf definition file
		ClientsModule.register([
			{
				name: PRODUCTS_PACKAGE_NAME,
				transport: Transport.GRPC,
				options: {
					package: PRODUCTS_PACKAGE_NAME,
					protoPath: resolve('./proto/products.proto'),
				},
			},
		]),
		ProductModule,
	],
	controllers: [ProductController],
})
export class ProductModule {}
