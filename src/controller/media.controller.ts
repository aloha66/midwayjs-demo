import { Controller, Inject, Post } from '@midwayjs/decorator'
import { MediaService } from '@/service'


@Controller('/api/media')
export class HomeController {

  @Inject()
    mediaService: MediaService
  
  @Post('/image_to_pdf')
  async image2pdf(): Promise<string> {
    this.mediaService.image2pdf()
    return 'Hello Midwayjs!'
  }
}
