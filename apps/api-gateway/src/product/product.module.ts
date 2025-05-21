import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { PRODUCTS_PACKAGE_NAME } from 'types/proto/products';
import { ProductController } from './product.controller';

@Module({
	imports: [
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
