import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsDashboards } from './analytics-dashboards';

describe(AnalyticsDashboards.name, () => {
  let component: AnalyticsDashboards;
  let fixture: ComponentFixture<AnalyticsDashboards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsDashboards],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsDashboards);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create analytics dashboards page.', () => {
    expect(component).toBeTruthy();
  });
});
