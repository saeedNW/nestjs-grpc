import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule);
	await app.listen(3000, () => {
		console.log('Api Gateway is running on port 3000');
	});
}
bootstrap();
