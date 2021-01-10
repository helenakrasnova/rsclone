export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating?: number;
}

export interface Result {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}

export interface MovieReviewResponseDto {
  id: number;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
