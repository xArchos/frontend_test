import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Output() nameAppended = new EventEmitter<string>();
  @Output() resetRequested = new EventEmitter<void>();
  isNameDisplayed: boolean = false;

  constructor(private dataService: DataService) {
  }

  appendName(): void {
    this.dataService.getData().subscribe(data => {
      const fullName: string = `${data.candidate.name} ${data.candidate.surname}`;
      this.nameAppended.emit(fullName);
      this.isNameDisplayed = true;
    });
  }

  requestReset(): void {
    this.resetRequested.emit();
    this.isNameDisplayed = false;
  }
}
