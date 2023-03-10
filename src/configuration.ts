import 'tsconfig-paths/register'
import { join } from 'path'
import { App, Configuration } from '@midwayjs/decorator'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware'
import { ResMiddleware } from './middleware/res.middleware'
import { NotFoundFilter } from './filter/notfound.filter'
import { DefaultErrorFilter } from './filter/default.filter'

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
    app: koa.Application

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, ResMiddleware])
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter])
  }
}
