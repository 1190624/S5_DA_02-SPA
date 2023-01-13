import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlaneamentoComponent } from './listar-planeamento.component';

describe('ListarPlaneamentoComponent', () => {
  let component: ListarPlaneamentoComponent;
  let fixture: ComponentFixture<ListarPlaneamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPlaneamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPlaneamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
