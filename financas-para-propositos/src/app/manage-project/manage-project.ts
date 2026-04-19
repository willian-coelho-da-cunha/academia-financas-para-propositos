import { DatePipe } from '@angular/common';
import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

export interface ProjectItem {
  id: string;
  name: string;
  order: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  releasedAt: string;
  [key: string]: string | number;
}

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

  private trueDataSource: ProjectItem[] = [];

  displayedColumns: string[] = ['order', 'name', 'description', 'status', 'releasedAt', 'actions'];
  pageSizeOptions = [50, 100, 150];
  pageSize = 50;
  pageIndex = 0;
  totalItems = this.dataSource.length;

  private get dataSource(): ProjectItem[] {
    return this.trueDataSource.filter((item: ProjectItem) => !item.deletedAt);
  }

  get paginatedData(): ProjectItem[] {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource.slice(start, start + this.pageSize);
  }

  get downloadDataDisabled(): boolean {
    return this.paginatedData.length === 0;
  }

  ngOnInit(): void {
    this.getDataFromLocalStorage();
  }

  onPageChange($event: PageEvent): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  add(): void {
    this.router.navigate(['/financial-goal']);
  }

  edit(item: ProjectItem): void {
    this.router.navigate(['/financial-goal'], { queryParams: { goal: item.id } });
  }

  delete(item: ProjectItem): void {
    const index: number = this.dataSource.findIndex((element: ProjectItem) => element.id === item.id);

    if (index > -1) {
      const confirmDelete: boolean = window.confirm(`Você tem certeza que deseja excluir "${item.name}"?`);

      if (confirmDelete) {
        this.dataSource[index].deletedAt = new Date().toISOString();
        this.totalItems = this.dataSource.length;
        if (this.paginatedData.length === 0 && this.pageIndex > 0) {
          this.pageIndex--;
        }
      }
    } else {
      window.alert('Item não encontrado para exclusão.');
    }
  }

  downloadData(): void {
    const dataText: string = this.dataSource
      .map((item: ProjectItem): string =>
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

  private getDataFromLocalStorage(): void {
    const dataStr: string | null = localStorage.getItem('projectDataStr');

    if (dataStr) {
      try {
        const parsedData: ProjectItem[] = dataStr.split('\n').map((line: string): ProjectItem => {
          const item: Partial<ProjectItem> = {};
          line.split(', ').forEach((pair: string): void => {
            const [key, value] = pair.split(': ');
            if (key === 'order') {
              item[key] = Number(value);
            } else {
              item[key] = value;
            }
          });
          return item as ProjectItem;
        });

        this.trueDataSource = parsedData;
        this.totalItems = this.dataSource.length;
      } catch (error) {
        window.alert(
          'Houve um erro ao carregar os dados do projeto. O arquivo pode estar corrompido ou em formato inválido.',
        );
      }
    }
  }
}
