import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface FinancialGoal {
  id: string;
  name: string;
  order: number;
  description: string;
  status: string;
  updatedAt: string;
  releasedAt: string;
}

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
export class FinancialPurpose implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  financialForm: FormGroup;
  isEditMode = false;
  goalId: string | null = null;
  statusOptions = ['Active', 'Inactive', 'Completed', 'On Hold'];

  constructor() {
    this.financialForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      order: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      status: ['Active', Validators.required],
      updatedAt: [new Date(), Validators.required],
      releasedAt: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['goal']) {
        this.goalId = params['goal'];
        this.isEditMode = true;
        this.loadGoalData();
      }
    });
  }

  private loadGoalData(): void {
    const data = this.getFinancialGoalsFromStorage();
    const goal = data.find((g: FinancialGoal) => g.id === this.goalId);

    if (goal) {
      this.financialForm.patchValue({
        name: goal.name,
        order: goal.order,
        description: goal.description,
        status: goal.status,
        updatedAt: new Date(goal.updatedAt),
        releasedAt: new Date(goal.releasedAt),
      });
    }
  }

  private getFinancialGoalsFromStorage(): FinancialGoal[] {
    try {
      const data = localStorage.getItem('financialGoals');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return [];
    }
  }

  private saveFinancialGoalsToStorage(goals: FinancialGoal[]): void {
    localStorage.setItem('financialGoals', JSON.stringify(goals));
  }

  onSubmit(): void {
    if (this.financialForm.valid) {
      const goals = this.getFinancialGoalsFromStorage();
      const formValue = this.financialForm.value;

      if (this.isEditMode && this.goalId) {
        // Update existing goal
        const index = goals.findIndex((g: FinancialGoal) => g.id === this.goalId);
        if (index > -1) {
          goals[index] = {
            id: this.goalId,
            name: formValue.name,
            order: formValue.order,
            description: formValue.description,
            status: formValue.status,
            updatedAt: formValue.updatedAt instanceof Date ? formValue.updatedAt.toISOString() : formValue.updatedAt,
            releasedAt: formValue.releasedAt instanceof Date ? formValue.releasedAt.toISOString() : formValue.releasedAt,
          };
        }
      } else {
        // Create new goal
        const newGoal: FinancialGoal = {
          id: Date.now().toString(),
          name: formValue.name,
          order: formValue.order,
          description: formValue.description,
          status: formValue.status,
          updatedAt: formValue.updatedAt instanceof Date ? formValue.updatedAt.toISOString() : formValue.updatedAt,
          releasedAt: formValue.releasedAt instanceof Date ? formValue.releasedAt.toISOString() : formValue.releasedAt,
        };
        goals.push(newGoal);
      }

      this.saveFinancialGoalsToStorage(goals);
      this.router.navigate(['/manage-project']);
    }
  }

  cancel(): void {
    this.router.navigate(['/manage-project']);
  }
}
