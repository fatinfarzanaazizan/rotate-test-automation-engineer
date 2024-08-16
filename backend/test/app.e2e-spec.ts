import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProductsService } from './../src/products/products.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const durian = {
    name: 'Durian',
    description: 'Musang King',
    price: 30,
  }

  const watermelon = {
    id: 2,
    name: 'Watermelon',
    description: 'Cooling and refreshing watermelons.',
    price: 10,
  };

  const updatedWatermelon = {
    id: 2,
    name: 'Watermelon',
    description: 'Cooling and refreshing watermelons. [updated]',
    price: 10,
  };

  const mockProductService = { //for mock data to pass to ProductService
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(ProductsService)
    .useValue(mockProductService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('create', () => {
    it('/products (POST)', async() => {
      mockProductService.create = jest.fn().mockResolvedValueOnce(durian);
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Durian', 
          description: 'Musang King', 
          price: 30,
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(durian)
          console.log('check data created: ' + JSON.stringify(response.body))
        })
    });
  })
  
  describe('update', () => {
    it('/products (PUT)', async() => {
      mockProductService.update = jest.fn().mockResolvedValueOnce(updatedWatermelon);
      return request(app.getHttpServer())
      .put('/products/' + watermelon.id)
      .send(updatedWatermelon)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(updatedWatermelon);
      })
    })
  })

  describe('delete', () => {
    it('/products (DELETE)', async() => {
      mockProductService.update = jest.fn().mockResolvedValueOnce(updatedWatermelon);
      return request(app.getHttpServer())
      .delete('/products/' + watermelon.id)
      .expect(200)
    })
  })

  

  
});
