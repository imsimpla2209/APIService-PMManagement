/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (_data, context: ExecutionContext) =>{
    const req = context.switchToHttp().getRequest();
    return req.user;
})