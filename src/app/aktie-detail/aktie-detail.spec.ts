import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktieDetail } from './aktie-detail';

describe('AktieDetail', () => {
  let component: AktieDetail;
  let fixture: ComponentFixture<AktieDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AktieDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AktieDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
