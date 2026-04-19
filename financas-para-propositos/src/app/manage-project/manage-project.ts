import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatePipe } from '@angular/common';

interface ProjectItem {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
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
export class ManageProject {
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'createdAt', 'actions'];
  dataSource: ProjectItem[] = [
    { id: 1, name: 'Project Alpha', description: 'First project', status: 'Active', createdAt: new Date('2023-01-01') },
    { id: 2, name: 'Project Beta', description: 'Second project', status: 'Inactive', createdAt: new Date('2023-02-01') },
    { id: 3, name: 'Project Gamma', description: 'Third project', status: 'Active', createdAt: new Date('2023-03-01') },
    // Add more sample data
    ...Array.from({ length: 147 }, (_, i) => ({
      id: i + 4,
      name: `Project ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
      description: `Description for project ${i + 4}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive',
      createdAt: new Date(2023, 0, i + 1),
    })),
  ];

  pageSizeOptions = [50, 100, 150];
  pageSize = 50;
  pageIndex = 0;
  totalItems = this.dataSource.length;

  get paginatedData(): ProjectItem[] {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  addNew(): void {
    const newId = Math.max(...this.dataSource.map(item => item.id)) + 1;
    const newItem: ProjectItem = {
      id: newId,
      name: `New Project ${newId}`,
      description: 'New project description',
      status: 'Active',
      createdAt: new Date(),
    };
    this.dataSource.unshift(newItem);
    this.totalItems = this.dataSource.length;
  }

  edit(item: ProjectItem): void {
    alert(`Edit item: ${item.name}`);
    // Implement edit logic, e.g., open a dialog
  }

  delete(item: ProjectItem): void {
    const index = this.dataSource.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.dataSource.splice(index, 1);
      this.totalItems = this.dataSource.length;
      // Adjust page index if necessary
      if (this.paginatedData.length === 0 && this.pageIndex > 0) {
        this.pageIndex--;
      }
    }
  }

  downloadData(): void {
    const dataText = this.dataSource.map(item =>
      `ID: ${item.id}, Name: ${item.name}, Description: ${item.description}, Status: ${item.status}, Created At: ${item.createdAt.toISOString()}`
    ).join('\n');

    const blob = new Blob([dataText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-data.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
