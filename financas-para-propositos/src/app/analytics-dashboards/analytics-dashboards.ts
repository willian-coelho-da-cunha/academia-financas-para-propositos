import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FinancialPurpose } from '../domain/financial-purpose';
import { FinancialPurposesRepository } from '../repositories/financial-purposes-repository';

@Component({
  selector: 'app-analytics-dashboards',
  imports: [
    CommonModule,
    GoogleChartsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './analytics-dashboards.html',
  styleUrl: './analytics-dashboards.scss',
})
export class AnalyticsDashboards implements OnInit {
  private readonly repository = inject(FinancialPurposesRepository);
  private readonly router = inject(Router);

  ChartType = ChartType; // Make ChartType available in template

  financialGoals: FinancialPurpose[] = [];

  // Chart data
  statusChartData: (string | number)[][] = [];
  orderChartData: (string | number)[][] = [];
  timelineChartData: (string | number | Date)[][] = [];
  amountChartData: (string | number)[][] = [];

  statusChartOptions = {
    title: 'Financial Goals by Status',
    pieHole: 0.4,
    colors: ['#1976d2', '#dc004e', '#388e3c', '#f57c00'],
    backgroundColor: 'transparent',
    legend: { position: 'bottom' },
    chartArea: { width: '80%', height: '70%' },
  };

  orderChartOptions = {
    title: 'Goals by Priority Order',
    hAxis: { title: 'Priority Order' },
    vAxis: { title: 'Number of Goals' },
    colors: ['#1976d2'],
    backgroundColor: 'transparent',
    legend: { position: 'none' },
  };

  timelineChartOptions = {
    title: 'Goals Timeline',
    hAxis: { title: 'Date' },
    vAxis: { title: 'Goals' },
    colors: ['#388e3c'],
    backgroundColor: 'transparent',
    legend: { position: 'none' },
  };

  amountChartOptions = {
    title: 'Total Amount by Status',
    hAxis: { title: 'Status' },
    vAxis: { title: 'Total Amount (BRL)' },
    colors: ['#ff9800'],
    backgroundColor: 'transparent',
    legend: { position: 'none' },
  };

  ngOnInit(): void {
    this.loadData();
    this.prepareCharts();
  }

  private loadData(): void {
    this.financialGoals = this.repository.getAll();
  }

  private prepareCharts(): void {
    this.prepareStatusChart();
    this.prepareOrderChart();
    this.prepareTimelineChart();
    this.prepareAmountChart();
  }

  private prepareStatusChart(): void {
    const statusCounts = this.financialGoals.reduce((acc, goal) => {
      acc[goal.status] = (acc[goal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    this.statusChartData = Object.entries(statusCounts).map(([status, count]) => [status, count]);
  }

  private prepareOrderChart(): void {
    const orderCounts = this.financialGoals.reduce((acc, goal) => {
      acc[goal.order] = (acc[goal.order] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    this.orderChartData = Object.entries(orderCounts)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([order, count]) => [order, count]);
  }

  private prepareTimelineChart(): void {
    const sortedGoals = [...this.financialGoals].sort((a, b) =>
      new Date(a.releasedAt).getTime() - new Date(b.releasedAt).getTime()
    );

    this.timelineChartData = sortedGoals.map(goal => [
      goal.name,
      new Date(goal.releasedAt),
      new Date(goal.updatedAt),
    ]);
  }

  private prepareAmountChart(): void {
    const amountByStatus = this.financialGoals.reduce((acc, goal) => {
      acc[goal.status] = (acc[goal.status] || 0) + goal.amount;
      return acc;
    }, {} as Record<string, number>);

    this.amountChartData = Object.entries(amountByStatus).map(([status, total]) => [status, total]);
  }

  goBack(): void {
    this.router.navigate(['/manage-project']);
  }
}
