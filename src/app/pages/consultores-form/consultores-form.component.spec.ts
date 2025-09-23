import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoresFormComponent } from './consultores-form.component';

describe('ConsultoresFormComponent', () => {
  let component: ConsultoresFormComponent;
  let fixture: ComponentFixture<ConsultoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoresFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
