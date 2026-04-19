import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-give-welcome',
  imports: [
    MatCard,
    MatButton,
    MatIcon,
    MatGridList,
    MatCardContent,
    MatGridTile,
    MatCardTitle,
    MatCardHeader,
    MatCardAvatar,
  ],
  templateUrl: './give-welcome.html',
  styleUrl: './give-welcome.scss',
})
export class GiveWelcome {
  private readonly router = inject(Router);

  onGetStarted(): void {
    this.router.navigate(['/get-started']);
  }
}
