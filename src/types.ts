export interface ArchiveFrame {
  url: string;
  label: string;
  caption: string;
  isVideo?: boolean;
}

export interface ArchiveEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  year: string;
  description: string;
  category: string;
  coverImage: string;
  frames: ArchiveFrame[];
}

export interface Message {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
}
