import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FinancialPurpose } from './financial-purpose';

describe(FinancialPurpose.name, () => {
  let component: FinancialPurpose;
  let fixture: ComponentFixture<FinancialPurpose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialPurpose, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialPurpose);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create financial purpose page.', () => {
    expect(component).toBeTruthy();
  });
});
