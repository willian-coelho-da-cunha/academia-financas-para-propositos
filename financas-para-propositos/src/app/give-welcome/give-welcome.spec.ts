import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GiveWelcome } from './give-welcome';

describe(GiveWelcome.name, () => {
  let component: GiveWelcome;
  let fixture: ComponentFixture<GiveWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveWelcome],
    }).compileComponents();

    fixture = TestBed.createComponent(GiveWelcome);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create welcome page.', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to learn-more page on Learn More button click.', () => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
    fixture.debugElement.query(By.css('[data-testid="learn-more-button"]')).nativeElement.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledExactlyOnceWith(['/learn-more']);
  });

  it('should navigate to get-started page on Get Started button click.', () => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
    fixture.debugElement.query(By.css('[data-testid="get-started-button"]')).nativeElement.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledExactlyOnceWith(['/get-started']);
  });
});
