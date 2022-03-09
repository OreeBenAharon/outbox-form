import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFirstComponent } from './reg-first.component';

describe('RegFirstComponent', () => {
  let component: RegFirstComponent;
  let fixture: ComponentFixture<RegFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
