import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';
import { CreateProduct, Product } from './products.interface';
import { RouterTestingModule } from "@angular/router/testing";


fdescribe('ProductsService', () => {

  let service: ProductsService;

  const redApple: Product = {
    id: 1,
    name: 'Red Apple',
    description: 'Sweet and juicy red apples.',
    price: 5
  };

  const watermelon: Product = {
    id: 2,
    name: 'Watermelon',
    description: 'Cooling and refreshing watermelons.',
    price: 10,
  };

  
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule, HttpClientModule]});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should get all products', () => {
      
      service.getProducts().subscribe((data) =>
        expect(data).toBeDefined());
    })

  })

  describe('getProductById', () => {
    it('should get product by id', () => {

      service.getProductById(1).subscribe((data) => {
        expect(data).toEqual(redApple);
      });
    });
  })

  describe('createProduct', () => {
    it('should create new product', () => {

      const lemon: CreateProduct = {
        name: 'Lemon', 
        description: 'Organic Lemon',
        price: 6,
      };

      service.createProduct(lemon).subscribe((data) => 
        expect(data).toBeTruthy); 
    });
  })

  describe('updateProduct', () => {
    it('should update the specific product', () => {

      const updatedWatermelon: Product = {
        id: 2,
        name: 'Watermelon',
        description: 'Cooling and refreshing watermelons. {updated}.',
        price: 10,
      }

      service.updateProduct(1, updatedWatermelon).subscribe((data) => {
        expect(data.description).toEqual(updatedWatermelon.description)
      });
    });
  })

  describe('deleteProduct', () => {
    it('should delete the specific product', () => {

      service.deleteProduct(16).subscribe({ next: () => {
        console.log('Delete successful');
      },
      error: error => {
        console.error('There was an error', error);
      }
      });
    });
  });

});
