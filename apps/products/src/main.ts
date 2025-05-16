import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';

async function bootstrap() {
	const app = await NestFactory.create(ProductsModule);
	await app.listen(30001, ()=>{
		console.log('Products Service is running on port 30001');
	});
}
bootstrap();
