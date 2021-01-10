import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraStatusComponent } from './infra-status.component';

describe('InfraStatusComponent', () => {
  let component: InfraStatusComponent;
  let fixture: ComponentFixture<InfraStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
