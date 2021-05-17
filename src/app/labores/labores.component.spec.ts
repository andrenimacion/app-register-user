import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboresComponent } from './labores.component';

describe('LaboresComponent', () => {
  let component: LaboresComponent;
  let fixture: ComponentFixture<LaboresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
