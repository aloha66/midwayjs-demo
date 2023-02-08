import { IMiddleware } from '@midwayjs/core'
import { Middleware } from '@midwayjs/decorator'
import { Context, NextFunction } from '@midwayjs/koa'

@Middleware()
export class ResMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next()
      if (result === null) 
        ctx.status = 200
      
      return {
        code: 0,
        message: 'OK',
        data: result,
      }
    }
  }

  match(ctx: Context): boolean {
    // 下面的匹配到的路由会执行此中间件
    if (ctx.path.includes('/api')) 
      return true
    
  }

  static getName(): string {
    return 'res'
  }
}
