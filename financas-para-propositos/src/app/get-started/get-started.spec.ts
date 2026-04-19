import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetStarted } from './get-started';

describe(GetStarted.name, () => {
  let component: GetStarted;
  let fixture: ComponentFixture<GetStarted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStarted],
    }).compileComponents();

    fixture = TestBed.createComponent(GetStarted);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create get started page.', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when file is not selected.', () => {
    const submitButton: DebugElement = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
    expect(submitButton.properties['disabled']).toEqual(true);
  });

  it('should disable submit button when an invalid file is selected.', () => {
    const fileInput: DebugElement = fixture.debugElement.query(By.css('[data-testid="file-input"]'));
    const testFile: File = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileList: Partial<FileList> = {
      length: 1,
      item: (index: number) => (index === 0 ? testFile : null),
      [0]: testFile,
    };
    const changeEvent: Event = new Event('change');
    Object.defineProperty(changeEvent, 'target', {
      value: { files: fileList },
    });

    fileInput.nativeElement.dispatchEvent(changeEvent);
    fixture.detectChanges();

    const submitButton: DebugElement = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
    expect(submitButton.properties['disabled']).toEqual(true);
  });

  it('should enable submit button when a valid file is selected.', () => {
    const fileInput: DebugElement = fixture.debugElement.query(By.css('[data-testid="file-input"]'));
    const testFile: File = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const fileList: Partial<FileList> = {
      length: 1,
      item: (index: number) => (index === 0 ? testFile : null),
      [0]: testFile,
    };
    const changeEvent: Event = new Event('change');
    Object.defineProperty(changeEvent, 'target', {
      value: { files: fileList },
    });

    fileInput.nativeElement.dispatchEvent(changeEvent);
    fixture.detectChanges();

    const submitButton: DebugElement = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
    expect(submitButton.properties['disabled']).toEqual(false);
  });

  it.skip('should navigate to manage-project page when submit button is clicked with valid file.', async () => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

    const fileInput: DebugElement = fixture.debugElement.query(By.css('[data-testid="file-input"]'));
    const testFile: File = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const fileList: Partial<FileList> = {
      length: 1,
      item: (index: number) => (index === 0 ? testFile : null),
      [0]: testFile,
    };
    const changeEvent: Event = new Event('change');
    Object.defineProperty(changeEvent, 'target', {
      value: { files: fileList },
    });

    fileInput.nativeElement.dispatchEvent(changeEvent);
    fixture.detectChanges();
    await fixture.whenStable();

    const submitButton: DebugElement = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
    submitButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.navigate).toHaveBeenCalledWith(['/manage-project']);
  });

  it('should navigate to manage-project page when start from scratch button is clicked.', async () => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

    const startFromScratchButton: DebugElement = fixture.debugElement.query(
      By.css('[data-testid="start-from-scratch-button"]'),
    );
    startFromScratchButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.navigate).toHaveBeenCalledWith(['/manage-project']);
  });

  it('should remove projectDataStr from localStorage when start from scratch button is clicked.', async () => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

    localStorage.setItem('projectDataStr', 'test data');

    const startFromScratchButton: DebugElement = fixture.debugElement.query(
      By.css('[data-testid="start-from-scratch-button"]'),
    );
    startFromScratchButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(localStorage.getItem('projectDataStr')).toBeNull();
  });
});
