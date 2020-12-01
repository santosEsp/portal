import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerpswComponent } from './restablecerpsw.component';

describe('RestablecerpswComponent', () => {
  let component: RestablecerpswComponent;
  let fixture: ComponentFixture<RestablecerpswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecerpswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecerpswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
