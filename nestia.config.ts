import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";

import { MyModule } from "./src/MyModule";

export const NESTIA_CONFIG: INestiaConfig = {
    input: async () => NestFactory.create(await MyModule()),
    output: "src/api",
    swagger: {
        output: "packages/api/swagger.json",
        servers: [
            {
                url: "http://localhost:37001",
                description: "Local Server",
            },
        ],
    },
    simulate: true,
};
export default NESTIA_CONFIG;
