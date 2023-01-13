import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPlaneamentoComponent } from './criar-planeamento.component';

describe('CriarPlaneamentoComponent', () => {
  let component: CriarPlaneamentoComponent;
  let fixture: ComponentFixture<CriarPlaneamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPlaneamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPlaneamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
