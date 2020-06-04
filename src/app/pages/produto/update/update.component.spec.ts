import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: ProdutoUpdateComponent;
  let fixture: ComponentFixture<ProdutoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
