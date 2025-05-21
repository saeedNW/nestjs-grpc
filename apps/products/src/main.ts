import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { resolve } from 'path';
import { PRODUCTS_PACKAGE_NAME } from 'types/proto/products';

async function bootstrap() {
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
