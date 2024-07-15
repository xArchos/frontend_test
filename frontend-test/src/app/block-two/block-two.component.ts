import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BlockCommunicationService } from "../services/block-communication.service";
import { DataService } from "../services/data.service";
import { ContentItem, Option } from "../../../public/models";
import { Subject, takeUntil } from "rxjs";
import { calculateContent } from "../../../public/content-utils";

@Component({
  selector: 'app-block-two',
  standalone: true,
  imports: [],
  templateUrl: './block-two.component.html',
  styleUrl: './block-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockTwoComponent implements OnInit, OnDestroy {
  content: string[] = [];
  selectedOption: Option = Option.First;
  private allContent: string[] = [];
  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(
    private blockCommunicationService: BlockCommunicationService,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.subscribeToBlockOneSelection();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private subscribeToBlockOneSelection(): void {
    this.blockCommunicationService.blockOneSelection$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(option => {
        this.selectedOption = option;
      });
  }

  private loadData(): void {
    this.dataService.getData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.allContent = data.content.map(item => item.content);
      });
  }

  replaceText(): void {
    this.dataService.getData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        const newContent: string = calculateContent(data.content, this.selectedOption);
        if (newContent) {
          this.content = [newContent];
          this.blockCommunicationService.updateBlockThreeContent(this.content);
        }
      });
  }

  private handleAppendContent(newContent: string, contentItems: ContentItem[]): void {
    if (newContent && !this.content.includes(newContent)) {
      this.content.push(newContent);
      this.content.sort();
      this.blockCommunicationService.updateBlockThreeContent(this.content);
    } else if (this.content.includes(newContent)) {
      alert(`Element '${newContent}' został już doklejony!`);
      if (this.selectedOption === Option.Random) {
        this.handleRandomContent(contentItems);
      }
    }
  }

  private handleRandomContent(contentItems: ContentItem[]): void {
    let newContent: string;
    let attempts: number = 0;
    const availableContent = this.allContent.filter(item => !this.content.includes(item));
    if (availableContent.length > 0) {
      do {
        newContent = calculateContent(contentItems, this.selectedOption);
        attempts++;
      } while (this.content.includes(newContent) && attempts < availableContent.length);

      if (!this.content.includes(newContent)) {
        this.content.push(newContent);
        this.content.sort();
        this.blockCommunicationService.updateBlockThreeContent(this.content);
      }
    } else {
      alert('Wszystkie elementy zostały już dodane!');
    }
  }

  appendText(): void {
    this.dataService.getData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        let newContent: string = calculateContent(data.content, this.selectedOption);
        this.handleAppendContent(newContent, data.content);
      });
  }
}
