import { DOCUMENT } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FinancialPurpose } from '../domain/financial-purpose';
import { FinancialPurposesRepository } from '../repositories/financial-purposes-repository';
import { ManageProject } from './manage-project';

describe(ManageProject.name, () => {
  let component: ManageProject;
  let fixture: ComponentFixture<ManageProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProject],
    }).compileComponents();

    const financialPurposesRepository = TestBed.inject(FinancialPurposesRepository);
    financialPurposesRepository.post({
      id: '1',
      name: 'Project 1',
      order: 1,
      description: 'Description 1',
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      deletedAt: '',
      releasedAt: '2024-01-03T00:00:00Z',
    });

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
    const itemToDelete: FinancialPurpose = component.paginatedData[0];
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.delete(itemToDelete);
    expect(component['trueDataSource'].find((item: FinancialPurpose) => item.id === itemToDelete.id)).toBeUndefined();
  });

  it('should not delete item if confirmation is cancelled.', () => {
    const itemToDelete: FinancialPurpose = component.paginatedData[0];
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    component.delete(itemToDelete);
    expect(
      component['trueDataSource'].find((item: FinancialPurpose) => item.id === itemToDelete.id),
    ).not.toBeUndefined();
  });

  it('should navigate to add page on add.', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.add();
    expect(navigateSpy).toHaveBeenCalledWith(['/financial-goal', 'new']);
  });

  it('should navigate to edit page on edit.', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const itemToEdit: FinancialPurpose = component.paginatedData[0];
    component.edit(itemToEdit);
    expect(navigateSpy).toHaveBeenCalledWith(['/financial-goal', itemToEdit.id]);
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
