import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-get-started',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './get-started.html',
  styleUrl: './get-started.scss',
})
export class GetStarted {
  uploadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      this.uploadForm.patchValue({ file });
    } else {
      // Handle invalid file type
      alert('Please select a .txt file.');
      event.target.value = '';
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      const file = this.uploadForm.value.file;
      console.log('File uploaded:', file);
      // Here you can process the file, e.g., read its content
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log('File content:', content);
        // Process the content as needed
      };
      reader.readAsText(file);
    }
  }
}
