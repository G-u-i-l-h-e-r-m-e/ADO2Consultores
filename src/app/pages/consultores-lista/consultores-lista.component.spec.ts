import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoresListaComponent } from './consultores-lista.component';

describe('ConsultoresListaComponent', () => {
  let component: ConsultoresListaComponent;
  let fixture: ComponentFixture<ConsultoresListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoresListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultoresListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
