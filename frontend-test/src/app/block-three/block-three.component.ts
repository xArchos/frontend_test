import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BlockCommunicationService } from "../services/block-communication.service";
import { Subject, takeUntil } from "rxjs";

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
export class BlockThreeComponent implements OnInit, OnDestroy {
  content: string[] = [];
  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(
    private blockCommunicationService: BlockCommunicationService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.subscribeToContentUpdates();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private subscribeToContentUpdates(): void {
    this.blockCommunicationService.blockThreeContent$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(content => {
        this.content = content;
        this.cdr.markForCheck();
      });
  }
}
