import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { CriarCamiaoComponent } from './criar-camiao.component';

describe('CriarCamiaoComponent', () => {
  let component: CriarCamiaoComponent;
  let fixture: ComponentFixture<CriarCamiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarCamiaoComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCamiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
