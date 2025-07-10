
export interface Translation {
  [key: string]: string;
}

export interface Translations {
  en: Translation;
  ar: Translation;
}

export interface Service {
  icon: string;
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
}

export interface Project {
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  link: string;
  image: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorEmail: string;
  title: string;
  description: string;
  type: 'Project' | 'Course' | 'Workshop';
  isPaid: boolean;
  price: number;
  isApproved: boolean;
  createdAt: string;
}