import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from "./main-content/main-content.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'frontend-test';
}
