import { DatePipe } from '@angular/common';
import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { FinancialPurpose } from '../domain/financial-purpose';
import { FinancialPurposesRepository } from '../repositories/financial-purposes-repository';

@Component({
  selector: 'app-manage-project',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    DatePipe,
  ],
  templateUrl: './manage-project.html',
  styleUrl: './manage-project.scss',
})
export class ManageProject implements OnInit {
  private readonly router = inject(Router);
  private readonly ngDocument = inject(DOCUMENT);
  private readonly financialPurposesRepository = inject(FinancialPurposesRepository);

  private trueDataSource: FinancialPurpose[] = [];

  displayedColumns: string[] = ['order', 'name', 'description', 'status', 'releasedAt', 'actions'];
  pageSizeOptions = [50, 100, 150];
  pageSize = 50;
  pageIndex = 0;
  totalItems = this.dataSource.length;

  private get dataSource(): FinancialPurpose[] {
    return this.trueDataSource.filter((item: FinancialPurpose) => !item.deletedAt);
  }

  get paginatedData(): FinancialPurpose[] {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource.slice(start, start + this.pageSize);
  }

  get downloadDataDisabled(): boolean {
    return this.paginatedData.length === 0;
  }

  ngOnInit(): void {
    this.trueDataSource = this.financialPurposesRepository.getAll();
    this.totalItems = this.dataSource.length;
  }

  onPageChange($event: PageEvent): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  add(): void {
    this.router.navigate(['/financial-goal', 'new']);
  }

  edit(item: FinancialPurpose): void {
    this.router.navigate(['/financial-goal', item.id]);
  }

  delete(item: FinancialPurpose): void {
    const confirmDelete: boolean = window.confirm(`Você tem certeza que deseja excluir "${item.name}"?`);
    if (confirmDelete) {
      this.financialPurposesRepository.delete(item.id);
      this.trueDataSource = this.financialPurposesRepository.getAll();
      this.totalItems = this.dataSource.length;
      if (this.paginatedData.length === 0 && this.pageIndex > 0) {
        this.pageIndex--;
      }
    }
  }

  downloadData(): void {
    const dataText: string = this.dataSource
      .map((item: FinancialPurpose): string =>
        Object.entries(item)
          .map(([key, value]): string => `${key}: ${value}`)
          .join(', '),
      )
      .join('\n');

    const blob: Blob = new Blob([dataText], { type: 'text/plain' });
    const url: string = window.URL.createObjectURL(blob);
    const anchor: HTMLAnchorElement = this.ngDocument.createElement('a');
    anchor.href = url;
    anchor.download = 'project-data.txt';
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
}
