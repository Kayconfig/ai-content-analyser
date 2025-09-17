import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { apiDescription } from './common/constants';

async function bootstrap() {
  const logLevels: LogLevel[] = ['log', 'error'];
  if (process.env.ENABLE_DEBUG === 'true') {
    logLevels.push('debug');
  }
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels,
      json: true,
      colors: true,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Ai Content Analyzer')
    .setDescription(apiDescription)
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
