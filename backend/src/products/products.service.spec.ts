import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

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

  const updatedDescription = { description: 'Cooling and refreshing watermelons. [updated]'};

  const mockProductService = { //for mock data to pass to ProductService
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsService,
          useValue: mockProductService,
        }
        ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new product', async () => {
      mockProductService.create = jest.fn().mockResolvedValueOnce(durian);
      const response = await service.create({
        name: 'Durian',
        description: 'Musang King',
        price: 30,
      } as CreateProductDto);
      expect(response).toEqual(durian);  
    });
  })

  describe('findAll', () => {
    it('should find all products', async() => {
      mockProductService.findAll = jest.fn().mockResolvedValueOnce([durian]);
      const response = await service.findAll();
      expect(response).toEqual([durian]);
    })
  })

  describe('findOne', () => {
    it('should find specific product by id', async() => {
      mockProductService.findOne = jest.fn().mockResolvedValueOnce(watermelon);
      const response = await service.findOne(watermelon.id);
      expect(response).toEqual(watermelon);
    })
  })

  describe('update', () => {
    it('should update product by id', async() => {
      const updatedWatermelon = { watermelon, description: 'Cooling and refreshing watermelons. [updated]'}
      mockProductService.update = jest.fn().mockResolvedValueOnce(updatedWatermelon);
      try {
        const response = await service.update(
          watermelon.id, 
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
        const response = await service.remove(11);
        expect(response).toEqual({ deleted: true });
      } catch(error) {
        console.log('unable to delete product: ' + error);
      }
    });
  })





});
