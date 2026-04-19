import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FinancialPurposesRepository } from '../repositories/financial-purposes-repository';

@Component({
  selector: 'app-get-started',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './get-started.html',
  styleUrl: './get-started.scss',
})
export class GetStarted {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly financialPurposesRepository = inject(FinancialPurposesRepository);

  private file: File | null = null;

  readonly uploadForm: FormGroup = this.formBuilder.group({
    file: [null, Validators.required],
  });

  enableSubmit = false;

  onFileChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const files: FileList | null = target.files;

    if (!files || files.length === 0 || files.item(0)?.type !== 'text/plain') {
      this.enableSubmit = false;
      target.value = '';
    } else {
      this.file = files.item(0);
      this.enableSubmit = true;
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.enableSubmit && this.file) {
      this.financialPurposesRepository
        .uploadFromFile(this.file)
        .pipe(take(1))
        .subscribe({
          next: (): void => {
            this.router.navigate(['/manage-project']);
          },
        });
    }
  }

  startFromScratch(): void {
    this.financialPurposesRepository.deleteAll();
    this.router.navigate(['/manage-project']);
  }
}
