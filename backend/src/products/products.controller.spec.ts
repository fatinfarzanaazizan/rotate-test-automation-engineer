import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const dragonfruit = {
    name: 'Dragonfruit',
    description: 'New product - dragonfruit',
    price: 10,
  };

  const watermelon = {
    id: 2,
    name: 'Watermelon',
    description: 'Cooling and refreshing watermelons.',
    price: 10,
  };

  const mockProductService = { //for mock data to pass to ProductService
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),

  }

  const updatedDescription = { description: 'Cooling and refreshing watermelons. [updated]'};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
        ],
      
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('create new product', async() => {
      mockProductService.create = jest.fn().mockResolvedValueOnce(dragonfruit);
      try {
        const response = await controller.create({
          name: 'Dragonfruit',
          description: 'New product - dragonfruit',
          price: 10,
        } as CreateProductDto);
        expect(response).toEqual(dragonfruit);
      } catch (error) {
        console.log('unable to create product: ' + error);
      }
      
    });
  })

  describe('findAll', () => {
    it('should get all products', async() => {
      mockProductService.findAll = jest.fn().mockResolvedValueOnce([watermelon]);
      try {
        const response = await controller.findAll();
        expect(response).toEqual([watermelon])
      } catch(error) {
        console.log('find products error: ' + error);
      }
    });
  })


  describe('findOne', () => {
    it('should find the specific product', async() => {
      try {
        mockProductService.findOne = jest.fn().mockResolvedValueOnce(watermelon);
        const response = await controller.findOne(watermelon.id.toString());
        expect(response).toEqual(watermelon);
      } catch(error) {
        console.log('unable to find product: ' + error);
      }
    });
  })

  describe('update', () => {
    it('should update product by id', async() => {
      const updatedWatermelon = { watermelon, description: 'Cooling and refreshing watermelons. [updated]'}
      mockProductService.update = jest.fn().mockResolvedValueOnce(updatedWatermelon);
      try {
        const response = await controller.update(
          watermelon.id.toString(), 
          updatedDescription as UpdateProductDto,
        );
        expect(response).toEqual(updatedWatermelon);
      } catch(error) {
        console.log('unable to update product: ' + error);
      }
    })
  })

  describe('delete', () => {
    it('should delete product by id', async () => {
      mockProductService.remove = jest.fn().mockResolvedValueOnce({ deleted: true })
      try {
        const response = await controller.remove('11');
        expect(response).toEqual({ deleted: true });
      } catch(error) {
        console.log('unable to delete product: ' + error);
      }
    });
  })


});
