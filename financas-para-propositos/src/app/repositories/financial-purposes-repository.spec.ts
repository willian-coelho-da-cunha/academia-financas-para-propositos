import { TestBed } from '@angular/core/testing';
import { FinancialPurpose } from '../domain/financial-purpose';
import { FinancialPurposesRepository } from './financial-purposes-repository';

describe(FinancialPurposesRepository.name, () => {
  let service: FinancialPurposesRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialPurposesRepository);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create an instance.', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if there are no financial purposes in storage.', () => {
    expect(service.getAll()).toEqual([]);
  });

  it('should return all financial purposes from storage.', () => {
    const purposes: FinancialPurpose[] = [
      {
        id: '1',
        name: 'Goal 1',
        order: 1,
        description: 'Description 1',
        status: 'Ativo',
        amount: 1000,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        releasedAt: '',
      },
      {
        id: '2',
        name: 'Goal 2',
        order: 2,
        description: 'Description 2',
        status: 'Inativo',
        amount: 2000,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        releasedAt: '',
      },
    ];
    service.post(purposes[0]);
    service.post(purposes[1]);

    const _purposes: FinancialPurpose[] = service.getAll();
    expect(_purposes).toEqual(purposes);
  });

  it('should save a financial purpose to storage.', () => {
    const purposes: FinancialPurpose[] = [
      {
        id: '1',
        name: 'Goal 1',
        order: 1,
        description: 'Description 1',
        status: 'Ativo',
        amount: 1000,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        releasedAt: '',
      },
      {
        id: '2',
        name: 'Goal 2',
        order: 2,
        description: 'Description 2',
        status: 'Inativo',
        amount: 2000,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        releasedAt: '',
      },
    ];
    service.post(purposes[0]);
    service.post(purposes[1]);

    const _purposes: FinancialPurpose[] = service.getAll();
    expect(_purposes).toEqual(purposes);
  });

  it('should update an existing financial purpose in storage.', () => {
    const purpose: FinancialPurpose = {
      id: '1',
      name: 'Goal 1',
      order: 1,
      description: 'Description 1',
      status: 'Ativo',
      amount: 1000,
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      releasedAt: '',
    };
    service.post(purpose);

    const updatedPurpose: FinancialPurpose = {
      ...purpose,
      name: 'Updated Goal 1',
    };
    service.put(purpose.id, updatedPurpose);

    const _purpose: FinancialPurpose | undefined = service.get(purpose.id);
    expect(_purpose).toEqual(updatedPurpose);
  });

  it('should delete a financial purpose from storage.', () => {
    const purpose: FinancialPurpose = {
      id: '1',
      name: 'Goal 1',
      order: 1,
      description: 'Description 1',
      status: 'Ativo',
      amount: 1000,
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      releasedAt: '',
    };
    service.post(purpose);
    service.delete(purpose.id);

    const _purpose: FinancialPurpose | undefined = service.get(purpose.id);
    expect(_purpose).toBeUndefined();
  });

  it('should alert if item to delete is not found.', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    service.delete('non-existent');
    expect(window.alert).toHaveBeenCalledWith('Item não encontrado para exclusão.');
  });

  it('should delete all financial purposes from storage.', () => {
    const purposes: FinancialPurpose[] = [
      {
        id: '1',
        name: 'Goal 1',
        order: 1,
        description: 'Description 1',
        status: 'Ativo',
        amount: 1000,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        releasedAt: '',
      },
      {
        id: '2',
        name: 'Goal 2',
        order: 2,
        description: 'Description 2',
        status: 'Inativo',
        amount: 2000,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
        releasedAt: '',
      },
    ];
    service.post(purposes[0]);
    service.post(purposes[1]);

    service.deleteAll();
    expect(service.getAll()).toEqual([]);
  });
});
