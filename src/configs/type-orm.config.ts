/* eslint-disable prettier/prettier */

import { ConfigService } from "@nestjs/config";
// import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config = async (configService: ConfigService) => ({
    type: configService.get('DB_TYPE'),
    database: configService.get('DB_DATABASE'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'), 
    port: configService.get('DB_PORT'),
    host: configService.get('DB_HOST'),
    entities: [__dirname + '../dist/modules/**/entities/*.entity.{js,ts}'],
    synchronize: false, // false để khi thay đổi trong entities nó sẽ không tự update DB
    dropSchema: false,
    autoLoadEntities: true,
    logging: true
})

export default config;
