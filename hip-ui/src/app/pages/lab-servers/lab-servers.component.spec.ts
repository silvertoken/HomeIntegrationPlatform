import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabServersComponent } from './lab-servers.component';

describe('LabServersComponent', () => {
  let component: LabServersComponent;
  let fixture: ComponentFixture<LabServersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabServersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
