import { App, Catch } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  @App()
  app: Application;
  async catch(err: any, ctx: Context) {
    // 所有的未分类错误会到这里
    if (['prod', 'production'].includes(this.app.getEnv())) {
      const { code, message } = err;
      return { code, message };
    }
    return err;
  }
}
