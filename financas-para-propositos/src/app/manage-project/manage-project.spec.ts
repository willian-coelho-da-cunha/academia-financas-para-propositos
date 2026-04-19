import { DOCUMENT } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ManageProject, ProjectItem } from './manage-project';

describe(ManageProject.name, () => {
  let component: ManageProject;
  let fixture: ComponentFixture<ManageProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProject],
    }).compileComponents();

    localStorage.setItem(
      'projectDataStr',
      [
        {
          id: '1',
          name: 'Project 1',
          order: 1,
          description: 'Description 1',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
          deletedAt: '',
          releasedAt: '2024-01-03T00:00:00Z',
        },
      ]
        .map((item: ProjectItem): string =>
          Object.entries(item)
            .map(([key, value]): string => `${key}: ${value}`)
            .join(', '),
        )
        .join('\n'),
    );

    fixture = TestBed.createComponent(ManageProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create manage-project page.', () => {
    expect(component).toBeTruthy();
  });

  it('should load data from localStorage on init.', () => {
    expect(component.paginatedData.length).toBe(1);
    expect(component.paginatedData[0].id).toBe('1');
    expect(component.paginatedData[0].name).toBe('Project 1');
    expect(component.paginatedData[0].order).toBe(1);
    expect(component.paginatedData[0].description).toBe('Description 1');
    expect(component.paginatedData[0].status).toBe('active');
    expect(component.paginatedData[0].createdAt).toBe('2024-01-01T00:00:00Z');
    expect(component.paginatedData[0].updatedAt).toBe('2024-01-02T00:00:00Z');
    expect(component.paginatedData[0].deletedAt).toBe('');
    expect(component.paginatedData[0].releasedAt).toBe('2024-01-03T00:00:00Z');
  });

  it('should paginate data correctly.', () => {
    // Add more items to test pagination
    for (let i = 2; i <= 60; i++) {
      component['trueDataSource'].push({
        id: String(i),
        name: `Project ${i}`,
        order: i,
        description: `Description ${i}`,
        status: 'active',
        createdAt: `2024-01-${String(i).padStart(2, '0')}T00:00:00Z`,
        updatedAt: `2024-01-${String(i).padStart(2, '0')}T00:00:00Z`,
        deletedAt: '',
        releasedAt: `2024-01-${String(i).padStart(2, '0')}T00:00:00Z`,
      });
    }
    component.onPageChange({ pageIndex: 1, pageSize: 50, length: 60 } as PageEvent);
    expect(component.paginatedData.length).toBe(10);
    expect(component.paginatedData[0].id).toBe('51');
    expect(component.paginatedData[9].id).toBe('60');
  });

  it('should delete item correctly.', () => {
    const itemToDelete: ProjectItem = component.paginatedData[0];
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.delete(itemToDelete);
    expect(
      component['trueDataSource'].find((item: ProjectItem) => item.id === itemToDelete.id)?.deletedAt,
    ).toBeTruthy();
  });

  it('should not delete item if confirmation is cancelled.', () => {
    const itemToDelete: ProjectItem = component.paginatedData[0];
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    component.delete(itemToDelete);
    expect(component['trueDataSource'].find((item: ProjectItem) => item.id === itemToDelete.id)?.deletedAt).toBe('');
  });

  it('should alert if item to delete is not found.', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    component.delete({
      id: 'non-existent',
      name: '',
      order: 0,
      description: '',
      status: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      releasedAt: '',
    });
    expect(window.alert).toHaveBeenCalledWith('Item não encontrado para exclusão.');
  });

  it('should navigate to add page on add.', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.add();
    expect(navigateSpy).toHaveBeenCalledWith(['/financial-goal']);
  });

  it('should navigate to edit page on edit.', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const itemToEdit: ProjectItem = component.paginatedData[0];
    component.edit(itemToEdit);
    expect(navigateSpy).toHaveBeenCalledWith(['/financial-goal'], { queryParams: { goal: itemToEdit.id } });
  });

  it('should download data as text file.', () => {
    const ngDocument = TestBed.inject(DOCUMENT);
    const anchor: HTMLAnchorElement = ngDocument.createElement('a');
    const createElementSpy = vi.spyOn(ngDocument, 'createElement').mockReturnValue(anchor);

    component.downloadData();
    expect(anchor.href).toContain('blob:');
    expect(anchor.download).toBe('project-data.txt');
    expect(createElementSpy).toHaveBeenCalledWith('a');
  });
});
