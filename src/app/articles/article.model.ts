export class Article {
  id!: string;
  ref!: string;
  name!: string;
  title!: string;
  description!: string;
  duration!: number;
  status!: string;
  url?: string;
  tags?: string[];
  like?: string;
  [key: string]: string | number | string[] | undefined;
}

export type List = {
  id: string,
  list: string[]
};
