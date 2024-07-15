import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {
  @Input() candidateName: string = '';
  displayName: string = 'Zadanie rekrutacyjne';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateName']) {
      this.updateDisplayName();
    }
  }

  updateDisplayName(): void {
    this.displayName = `Zadanie rekrutacyjne${this.candidateName ? ` - ${this.candidateName}` : ''}`;
  }
}
