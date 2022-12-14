import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ListarCamiaoComponent } from './listar-camiao.component';
import {FilterPipe} from 'src/app/model/filterPipe';

describe('ListarCamiaoComponent', () => {
  let component: ListarCamiaoComponent;
  let fixture: ComponentFixture<ListarCamiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCamiaoComponent, FilterPipe ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCamiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
