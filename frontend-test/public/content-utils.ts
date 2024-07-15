import { ContentItem, Option } from "./models";

export function calculateContent(contentItems: ContentItem[], selectedOption: Option): string {
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
