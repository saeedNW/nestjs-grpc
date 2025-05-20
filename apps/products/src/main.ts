import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from 'types/proto/products';
import { Logger } from '@nestjs/common';
import { resolve } from 'path';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule, {
		transport: Transport.GRPC,
		options: {
			package: protobufPackage,
			protoPath: resolve('./proto/products.proto'),
		},
	});

	await app.listen();

	Logger.log('Products microservice is running');
}
bootstrap();
