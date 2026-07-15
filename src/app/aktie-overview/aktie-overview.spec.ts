import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktieOverview } from './aktie-overview';

describe('AktieOverview', () => {
  let component: AktieOverview;
  let fixture: ComponentFixture<AktieOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AktieOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(AktieOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
