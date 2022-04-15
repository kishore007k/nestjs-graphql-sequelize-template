import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import config from "config/swaggerConfig";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("", app, document);

  await app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}
bootstrap();
