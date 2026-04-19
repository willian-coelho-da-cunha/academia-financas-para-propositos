import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FinancialPurpose as FinancialPurposeInterface } from '../domain/financial-purpose';
import { FinancialPurposesRepository } from '../repositories/financial-purposes-repository';

@Component({
  selector: 'app-financial-purpose',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './financial-purpose.html',
  styleUrl: './financial-purpose.scss',
})
export class FinancialPurpose implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly financialPurposesRepository = inject(FinancialPurposesRepository);

  private readonly end: Subject<void> = new Subject<void>();

  readonly financialForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    order: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    status: ['Ativo', Validators.required],
    updatedAt: [new Date(), Validators.required],
    releasedAt: [''],
    createdAt: [''],
  });

  isEditMode = false;
  goalId: string | null = null;
  statusOptions = ['Ativo', 'Inativo', 'Concluído', 'Em Espera'];

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.end)).subscribe({
      next: (params: Params): void => {
        if (params['goal']) {
          this.goalId = params['goal'];
          this.isEditMode = this.goalId !== 'new';
          this.loadGoalData();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }

  private loadGoalData(): void {
    const goal: FinancialPurposeInterface | undefined = this.financialPurposesRepository.get(this.goalId!);

    if (goal) {
      this.financialForm.patchValue({
        name: goal.name,
        order: goal.order,
        description: goal.description,
        amount: goal.amount,
        status: goal.status,
        updatedAt: new Date(goal.updatedAt),
        releasedAt: new Date(goal.releasedAt),
        createdAt: new Date(goal.createdAt),
      });
    }
  }

  onSubmit(): void {
    if (this.financialForm.valid) {
      const formValue = this.financialForm.value;

      if (this.isEditMode && this.goalId) {
        // Update existing goal
        this.financialPurposesRepository.put(this.goalId, {
          id: this.goalId,
          name: formValue.name,
          order: formValue.order,
          description: formValue.description,
          amount: formValue.amount,
          status: formValue.status,
          updatedAt: formValue.updatedAt instanceof Date ? formValue.updatedAt.toISOString() : formValue.updatedAt,
          releasedAt: formValue.releasedAt instanceof Date ? formValue.releasedAt.toISOString() : formValue.releasedAt,
          createdAt: formValue.createdAt instanceof Date ? formValue.createdAt.toISOString() : formValue.createdAt,
          deletedAt: '',
        });
      } else {
        // Create new goal
        const newGoal: FinancialPurposeInterface = {
          id: Date.now().toString(),
          name: formValue.name,
          order: formValue.order,
          description: formValue.description,
          amount: formValue.amount,
          status: formValue.status,
          updatedAt: formValue.updatedAt instanceof Date ? formValue.updatedAt.toISOString() : formValue.updatedAt,
          releasedAt: formValue.releasedAt instanceof Date ? formValue.releasedAt.toISOString() : formValue.releasedAt,
          createdAt: new Date().toISOString(),
          deletedAt: '',
        };
        this.financialPurposesRepository.post(newGoal);
      }
      this.router.navigate(['/manage-project']);
    }
  }

  cancel(): void {
    this.router.navigate(['/manage-project']);
  }
}
