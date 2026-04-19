import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './get-started.html',
  styleUrl: './get-started.scss',
})
export class GetStarted {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

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
      const reader: FileReader = new FileReader();

      reader.onload = ($event: ProgressEvent<FileReader>): void => {
        if ($event.target) {
          const result: ArrayBuffer | string | null = $event.target.result;

          if (result instanceof ArrayBuffer) {
            const decoder: TextDecoder = new TextDecoder('utf-8');
            const content: string = decoder.decode(result, { stream: true });
            localStorage.setItem('projectDataStr', content);
            this.router.navigate(['/manage-project']);
          } else if (typeof result === 'string') {
            window.alert('Houve um erro inesperado ao ler o arquivo. Conteúdo do arquivo: ' + result);
          } else {
            window.alert('Houve um erro inesperado ao ler o arquivo. Conteúdo do arquivo: ' + result);
          }
        }
      };
      reader.readAsArrayBuffer(this.file);
    }
  }

  startFromScratch(): void {
    localStorage.removeItem('projectDataStr');
    this.router.navigate(['/manage-project']);
  }
}
