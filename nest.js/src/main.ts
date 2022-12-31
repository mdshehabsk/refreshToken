import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.CLIENT_URL)
  const app = await NestFactory.create(AppModule,{
    cors:{
      origin:process.env.CLIENT_URL
    }
  });
  await app.listen(4000);
}
bootstrap();
