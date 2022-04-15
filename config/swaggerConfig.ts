import { DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle("API")
  .setDescription("API description")
  .setVersion("1.0")
  .addTag("nestJs-Rest-API")
  .build();

export default config;
