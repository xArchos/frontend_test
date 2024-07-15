export enum Option {
  First = 'first',
  Second = 'second',
  Random = 'random'
}

export interface ContentItem {
  content: string;
}

export interface Candidate {
  name: string;
  surname: string;
}

export interface Data {
  content: ContentItem[];
  candidate: Candidate;
}
