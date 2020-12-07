import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VRealizeComponent } from './v-realize.component';

describe('VRealizeComponent', () => {
  let component: VRealizeComponent;
  let fixture: ComponentFixture<VRealizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VRealizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VRealizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
