import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ListarEntregaComponent } from './listar-entrega.component';
import {FilterPipe} from 'src/app/model/filterPipe';

describe('ListarEntregaComponent', () => {
  let component: ListarEntregaComponent;
  let fixture: ComponentFixture<ListarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEntregaComponent, FilterPipe ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
