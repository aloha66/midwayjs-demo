// src/error/custom.error.ts
import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

export class CustomHttpError extends MidwayHttpError {
  constructor(obj) {
    super('my custom error', HttpStatus.BAD_REQUEST, '10002', obj);
  }
}
