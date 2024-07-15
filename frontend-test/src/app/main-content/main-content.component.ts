import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BlockThreeComponent } from "../block-three/block-three.component";
import { BlockTwoComponent } from "../block-two/block-two.component";
import { BlockOneComponent } from "../block-one/block-one.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    BlockThreeComponent,
    BlockTwoComponent,
    BlockOneComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  providers: [

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent {
  candidateName: string = '';

  @ViewChild(BlockThreeComponent) blockThree!: BlockThreeComponent;

  onNameAppended(name: string): void {
    this.candidateName = name;
  }

  onResetRequested(): void {
    window.location.reload();
  }
}
