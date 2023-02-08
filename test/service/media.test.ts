import { createApp, close } from '@midwayjs/mock'
import { Framework } from '@midwayjs/koa'
import { MediaService } from '@/service'

describe('test/service/media.test.ts', () => {

    it('should GET /', async () => {
    // create app
        const app = await createApp<Framework>()

        // 传入 class 忽略泛型也能正确推导
        const mediaService = await app.getApplicationContext().getAsync(MediaService)
        const ee = await mediaService.image2pdf()

        expect(ee).toMatchSnapshot()
   
        // close app
        await close(app)
    })

})
