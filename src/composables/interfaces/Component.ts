interface SubHeaders {
  id?: number;
  headingID?: number;
  subHeadingTitle: string;
  subHeadingContent: string;
}

interface StorypageContent {
  id: number;
  sectionOrder?: number;
  headingTitle: string;
  headingContent: string;
  subHeaders?: SubHeaders[];
}

interface Dictionary {
  id: number;
  chabacanoLang: string;
  tagalogLang: string;
  englishLang: string;
  definition: string;
}

export type { StorypageContent, Dictionary };
