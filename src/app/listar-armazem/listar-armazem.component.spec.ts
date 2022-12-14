import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ListarArmazemComponent } from './listar-armazem.component';
import {FilterPipe} from 'src/app/model/filterPipe';

describe('ListarArmazemComponent', () => {
  let component: ListarArmazemComponent;
  let fixture: ComponentFixture<ListarArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarArmazemComponent, FilterPipe ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
