import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlockCommunicationService } from "../services/block-communication.service";
import { DataService } from "../services/data.service";
import { ContentItem, Option } from "../../../public/models";

@Component({
  selector: 'app-block-two',
  standalone: true,
  imports: [],
  templateUrl: './block-two.component.html',
  styleUrl: './block-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockTwoComponent implements OnInit {
  content: string[] = [];
  selectedOption: Option = Option.First;
  private allContent: string[] = [];

  constructor(
    private blockCommunicationService: BlockCommunicationService,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.blockCommunicationService.blockOneSelection$.subscribe(option => {
      this.selectedOption = option;
    });

    this.dataService.getData().subscribe(data => {
      this.allContent = data.content.map(item => item.content);
    });
  }

  replaceText(): void {
    this.dataService.getData().subscribe(data => {
      const newContent: string = this.calculateContent(data.content, this.selectedOption);
      if (newContent) {
        this.content = [newContent];
        this.blockCommunicationService.updateBlockThreeContent(this.content);
      }
    });
  }

  appendText() {
    this.dataService.getData().subscribe(data => {
      let newContent: string = this.calculateContent(data.content, this.selectedOption);
      if (newContent && !this.content.includes(newContent)) {
        this.content.push(newContent);
        this.content.sort();
        this.blockCommunicationService.updateBlockThreeContent(this.content);
      } else if (this.content.includes(newContent)) {
        alert(`Element '${newContent}' został już doklejony!`);
        if (this.selectedOption === Option.Random) {
          let attempts: number = 0;
          do {
            newContent = this.calculateContent(data.content, this.selectedOption);
            attempts++;
          } while (this.content.includes(newContent) && attempts < this.allContent.length);
          if (!this.content.includes(newContent)) {
            this.content.push(newContent);
            this.content.sort();
            this.blockCommunicationService.updateBlockThreeContent(this.content);
          } else {
            alert('Wszystkie elementy zostały już dodane!');
          }
        }
      }
    });
  }

  private calculateContent(contentItems: ContentItem[], selectedOption: Option): string {
    switch (selectedOption) {
      case Option.First:
        return contentItems[0].content;
      case Option.Second:
        return contentItems[1].content;
      case Option.Random:
        const randomIndex: number = Math.floor(Math.random() * contentItems.length);
        return contentItems[randomIndex].content;
      default:
        return '';
    }
  }
}
