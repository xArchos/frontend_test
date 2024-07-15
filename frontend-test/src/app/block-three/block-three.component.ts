import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BlockCommunicationService } from "../services/block-communication.service";

@Component({
  selector: 'app-block-three',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './block-three.component.html',
  styleUrl: './block-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockThreeComponent implements OnInit {
  content: string[] = [];

  constructor(
    private blockCommunicationService: BlockCommunicationService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.blockCommunicationService.blockThreeContent$.subscribe(content => {
      this.content = content;
      this.cdr.markForCheck();
    });
  }
}
