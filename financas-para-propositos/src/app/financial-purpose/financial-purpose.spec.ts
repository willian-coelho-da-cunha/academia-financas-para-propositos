import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPurpose } from './financial-purpose';

describe('FinancialPurpose', () => {
  let component: FinancialPurpose;
  let fixture: ComponentFixture<FinancialPurpose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialPurpose],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialPurpose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
