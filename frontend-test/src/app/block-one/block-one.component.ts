import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Data, Option } from "../../../public/models";
import { BlockCommunicationService } from "../services/block-communication.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-block-one',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './block-one.component.html',
  styleUrl: './block-one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockOneComponent implements OnInit, OnDestroy {
  readonly Option = Option;
  form: FormGroup;
  content: string = '';
  data!: Data;

  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(private dataService: DataService, private fb: FormBuilder, private blockCommunicationService: BlockCommunicationService) {
    this.form = this.fb.group({
      option: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();

    this.form.get('option')?.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => this.selectOption(value));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  selectOption(option: Option): void {
    this.blockCommunicationService.updateBlockOneSelection(option);
    this.updateContent();
  }

  private loadData(): void {
    this.dataService.getData().subscribe({
      next: data => {
        this.data = data;
        this.updateContent();
      },
      error: err => {
        console.error('Failed to load data', err);
      }
    });
  }

  private updateContent(): void {
    if (!this.data) return;

    const selectedOption = this.form.get('option')?.value;
    if (selectedOption) {
      this.content = this.calculateContent(selectedOption);
    } else {
      this.content = '';
    }
  }

  private calculateContent(selectedOption: Option): string {
    switch (selectedOption) {
      case Option.First:
        return this.data.content[0].content;
      case Option.Second:
        return this.data.content[1].content;
      case Option.Random:
        const randomIndex: number = Math.floor(Math.random() * this.data.content.length);
        return this.data.content[randomIndex].content;
      default:
        return '';
    }
  }
}
