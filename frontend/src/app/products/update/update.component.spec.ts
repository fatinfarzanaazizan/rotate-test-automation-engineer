import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update.component';
import { RouterTestingModule } from "@angular/router/testing";

fdescribe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
      imports: [HttpClientModule, RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onUpdate', () => {
    it('should accept valid input', () => {
      component.updateProductForm.setValue({
        name: 'Red Apple',
        description: 'Sweet and juicy red apples (new).',
        price: 5,
      });

      expect(component.updateProductForm.valid).toEqual(true);
    });
  });
});
