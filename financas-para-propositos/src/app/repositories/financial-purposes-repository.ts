import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialPurpose } from '../domain/financial-purpose';

@Injectable({
  providedIn: 'root',
})
export class FinancialPurposesRepository {
  private readonly storageKey = btoa('financial-purposes');
  private financialPurposes: FinancialPurpose[] = [];

  get(id: string): FinancialPurpose | undefined {
    return this.getAll().find((item: FinancialPurpose): boolean => item.id === id);
  }

  getAll(): FinancialPurpose[] {
    if (this.financialPurposes.length > 0) {
      return structuredClone(this.financialPurposes);
    }

    try {
      this.financialPurposes = this.getFromStorage();
    } catch (error) {
      this.financialPurposes = [];
      window.alert(
        'Houve um erro ao carregar os dados do projeto. O arquivo pode estar corrompido ou em formato inválido.',
      );
    }
    return structuredClone(this.financialPurposes);
  }

  put(id: string, financialPurpose: FinancialPurpose): void {
    const existingIndex: number = this.getAll().findIndex((item: FinancialPurpose): boolean => item.id === id);

    if (existingIndex !== -1) {
      this.financialPurposes[existingIndex] = structuredClone(financialPurpose);
      this.saveInStorage();
    } else {
      window.alert('Item não encontrado para atualização.');
    }
  }

  post(financialPurpose: FinancialPurpose): void {
    const existingIndex: number = this.getAll().findIndex(
      (item: FinancialPurpose): boolean => item.id === financialPurpose.id,
    );

    if (existingIndex !== -1) {
      this.financialPurposes[existingIndex] = structuredClone(financialPurpose);
    } else {
      this.financialPurposes.push(structuredClone(financialPurpose));
    }
    this.saveInStorage();
  }

  delete(id: string): void {
    const existingIndex: number = this.getAll().findIndex((item: FinancialPurpose): boolean => item.id === id);

    if (existingIndex !== -1) {
      this.financialPurposes.splice(existingIndex, 1);
      this.saveInStorage();
    } else {
      window.alert('Item não encontrado para exclusão.');
    }
  }

  deleteAll(): void {
    this.financialPurposes = [];
    localStorage.removeItem(this.storageKey);
  }

  uploadFromFile(file: File): Observable<void> {
    return new Observable((observer) => {
      const reader: FileReader = new FileReader();

      reader.onload = ($event: ProgressEvent<FileReader>): void => {
        if ($event.target) {
          const result: ArrayBuffer | string | null = $event.target.result;

          if (result instanceof ArrayBuffer) {
            const decoder: TextDecoder = new TextDecoder('utf-8');
            const content: string = decoder.decode(result, { stream: true });
            localStorage.setItem(this.storageKey, content);
            observer.next();
          } else {
            window.alert('Houve um erro ao processar o arquivo. Verifique se o formato está correto.');
            localStorage.removeItem(this.storageKey);
          }
        }
        observer.complete();
      };
      reader.readAsArrayBuffer(file);
    });
  }

  private saveInStorage(): void {
    const dataText: string = this.financialPurposes
      .map((item: FinancialPurpose): string =>
        Object.entries(item)
          .map(([key, value]): string => `${key}: ${value}`)
          .join(', '),
      )
      .join('\n');
    localStorage.setItem(this.storageKey, dataText);
  }

  private getFromStorage(): FinancialPurpose[] {
    const dataStr: string | null = localStorage.getItem(this.storageKey);

    if (!dataStr) {
      throw new Error('Nenhum dado encontrado no armazenamento para a chave: ' + this.storageKey);
    }

    const parsedData: FinancialPurpose[] = dataStr.split('\n').map((line: string): FinancialPurpose => {
      const item: Partial<FinancialPurpose> = {};

      line.split(', ').forEach((pair: string): void => {
        const [key, value] = pair.split(': ');

        if (key === 'order') {
          item[key] = Number(value);
        } else {
          item[key] = value;
        }
      });
      return item as FinancialPurpose;
    });
    return parsedData as FinancialPurpose[];
  }
}
