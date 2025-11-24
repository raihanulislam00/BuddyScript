export interface UserSummary {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface CommentDTO {
  id: string;
  content: string;
  createdAt: string;
  author: UserSummary;
  likes: UserSummary[];
  replies: CommentDTO[];
  parentId?: string | null;
}

export interface PostDTO {
  id: string;
  content: string;
  imageUrl?: string | null;
  isPrivate: boolean;
  createdAt: string;
  author: UserSummary;
  likes: UserSummary[];
  comments: CommentDTO[];
}
