import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Option } from '../../../public/models';

@Injectable()
export class BlockCommunicationService {
  private blockOneSelectionSubject = new BehaviorSubject<Option>(Option.First);
  blockOneSelection$: Observable<Option> = this.blockOneSelectionSubject.asObservable();

  private blockThreeContentSubject = new BehaviorSubject<string[]>([]);
  blockThreeContent$: Observable<string[]> = this.blockThreeContentSubject.asObservable();

  updateBlockOneSelection(option: Option): void {
    this.blockOneSelectionSubject.next(option);
  }

  updateBlockThreeContent(content: string[]): void {
    this.blockThreeContentSubject.next(content);
  }
}
