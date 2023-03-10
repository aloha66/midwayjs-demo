import { Controller, Get, Inject, Query } from '@midwayjs/decorator'
import { Context } from '@midwayjs/koa'
import { CustomHttpError } from '../error/custom.error'
import { UserService } from '../service/user.service'

@Controller('/api')
export class APIController {
  @Inject()
    ctx: Context

  @Inject()
    userService: UserService

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid })
    return user
  }

  @Get('/get_err')
  async getErr() {
    throw new CustomHttpError({ cause: { eee: '222' } })
  }
}
