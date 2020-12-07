import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsxtComponent } from './nsxt.component';

describe('NsxtComponent', () => {
  let component: NsxtComponent;
  let fixture: ComponentFixture<NsxtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsxtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
