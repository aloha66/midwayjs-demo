import { Provide } from '@midwayjs/decorator';

@Provide()
export class MediaService {
  async image2pdf() {
    return {
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
