import {ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesComponent } from './informes.component';

describe('BarraComponent', () => {
  let component: InformesComponent;
  let fixture: ComponentFixture<InformesComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ InformesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
