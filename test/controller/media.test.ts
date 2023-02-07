import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';
import path from 'path';
import fs from 'fs';

describe('test/controller/media.test.ts', () => {

  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch(err) {
        console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  it('should POST /api/media/image_to_pdf using URL', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/api/media/image_to_pdf')
      .send({ url: [''] });
    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
    expect(typeof result.body.data).toBe('string');
  });

  it('should POST /api/media/image_to_pdf using base64', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/api/media/image_to_pdf')
      .send({ base64: [''] });
    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
    expect(typeof result.body.data).toBe('string');
  });

  it('should POST /api/media/image_to_pdf using file', async () => {
    // make request
    const imagePath = path.resolve(__dirname, 'image.jpg');
    const result = await createHttpRequest(app)
      .post('/api/media/image_to_pdf')
      .attach('file', fs.readFileSync(imagePath), 'image.jpg');
    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
    expect(typeof result.body.data).toBe('string');
    // close app
    await close(app);
  });

  it('should POST /api/media/image_to_pdf using three type', async () => {
    // make request
    const imagePath = path.resolve(__dirname, 'image.jpg');
    const result = await createHttpRequest(app)
      .post('/api/media/image_to_pdf')
      .attach('file', fs.readFileSync(imagePath), 'image.jpg')
      .field('base64', ['My cats'])
      .field('url', ['My cats'])
    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');
    expect(typeof result.body.data).toBe('string');
  });

});
