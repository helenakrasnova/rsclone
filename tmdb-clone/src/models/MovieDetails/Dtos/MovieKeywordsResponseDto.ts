export interface Keyword {
  id: number;
  name: string;
}

export interface MovieKeywordsResponseDto {
  id: number;
  keywords: Keyword[];
}
