import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktieKaufen } from './aktie-kaufen';

describe('AktieKaufen', () => {
  let component: AktieKaufen;
  let fixture: ComponentFixture<AktieKaufen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AktieKaufen],
    }).compileComponents();

    fixture = TestBed.createComponent(AktieKaufen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
