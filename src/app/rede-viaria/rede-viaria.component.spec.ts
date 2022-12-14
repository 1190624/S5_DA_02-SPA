import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeViariaComponent } from './rede-viaria.component';

describe('RedeViariaComponent', () => {
  let component: RedeViariaComponent;
  let fixture: ComponentFixture<RedeViariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeViariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeViariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
