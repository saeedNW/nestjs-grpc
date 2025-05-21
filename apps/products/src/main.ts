import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { resolve } from 'path';
import { PRODUCTS_PACKAGE_NAME } from 'types/proto/products';

async function bootstrap() {
	// Create a new gRPC microservice instance with the ProductsModule
	// Configure it to use the products proto file and package name for service definitions
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule, {
		transport: Transport.GRPC,
		options: {
			package: PRODUCTS_PACKAGE_NAME,
			protoPath: resolve('./proto/products.proto'),
		},
	});

	await app.listen();

	Logger.log('Products microservice is running');
}
bootstrap();
