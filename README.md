# NestJS gRPC Microservices Example

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project demonstrates how to build a microservices architecture using NestJS and gRPC. The application consists of:

1. **API Gateway** - Acts as the entry point for client requests and forwards them to the appropriate microservice
2. **Products Service** - A microservice that handles product-related operations

The communication between the API Gateway and the Products Service is implemented using gRPC, which provides efficient, type-safe RPC communication.

## Project Structure

```text
nestjs-grpc/
├── apps/
│   ├── api-gateway/          # API Gateway service
│   │   ├── src/
│   │   │   ├── product/      # Product module in API Gateway
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.module.ts
│   │   │   │   └── ...
│   │   │   ├── api-gateway.module.ts
│   │   │   └── ...
│   │   └── ...
│   ├── products/             # Products microservice
│   │   ├── src/
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   ├── products.module.ts
│   │   │   └── ...
│   │   └── ...
├── proto/                    # Protocol Buffers definitions
│   ├── product.proto         # Product service definition
│   └── ...
└── ...
```

## Features

- **Microservices Architecture**: Modular and scalable design using NestJS
- **gRPC Communication**: High-performance RPC framework for service-to-service communication
- **Type Safety**: Strongly typed interfaces using Protocol Buffers
- **API Gateway Pattern**: Single entry point for client applications

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Protocol Buffers compiler (protoc)

## Installation

```bash
npm install
```

## Running the Application

```bash
# Start API Gateway
npm run start:dev api-gateway

# Start Products Service
npm run start:dev products
```

### Production Mode

Build and start all services in production mode:

```bash
# Build
npm run build

# Build proto buffer types
npm run proto:ts

# Start
npm run start:prod
```

## API Endpoints

### Products API

- **GET /product** - Get a sample product

## gRPC Services

### Products Service

- **getProduct(ProductRequest)** - Returns product details based on the provided ID

## Protocol Buffers

The project uses Protocol Buffers for defining service contracts. The main proto file is located at `proto/product.proto`.

Example of the Products service definition:

```protobuf
syntax = "proto3";

package products;

service ProductsService {
  rpc GetProduct (ProductRequest) returns (ProductResponse);
}

message ProductRequest {
  int32 id = 1;
}

message ProductResponse {
  int32 id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
}
```

## Implementation Details

### API Gateway

The API Gateway uses NestJS's ClientGrpc to communicate with the Products microservice:

```typescript
@Controller('products')
export class ProductController implements OnModuleInit {
	private productService: ProductsServiceClient;

	constructor(@Inject(PRODUCTS_PACKAGE_NAME) private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.productService = this.client.getService<ProductsServiceClient>(PRODUCTS_SERVICE_NAME);
	}

	@Get()
	findOne() {
		return this.productService.getProduct({ id: 1 });
	}
}
```

### Products Microservice

The Products microservice implements the gRPC service defined in the proto file:

```typescript
@Controller()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@GrpcMethod('ProductsService', 'GetProduct')
	getProduct(request: ProductRequest): Promise<ProductResponse> {
		return this.productsService.getProduct(request);
	}
}
```

## Deployment

For deployment instructions, please refer to the [NestJS documentation](https://docs.nestjs.com/deployment).

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)

## License

This project is [MIT licensed](LICENSE).
