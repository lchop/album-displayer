export class Article {
  id!: string;
  creationDate !: Date;
  title!: string;
  description!: string;
  status!: string;
  url?: string;
  tags?: string[];
  like?: string;
  [key: string]: string | Date | number | string[] | undefined;
}

export type List = {
  id: string,
  list: string[]
};
