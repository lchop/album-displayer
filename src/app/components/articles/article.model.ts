export class Article {
  creationDate !: Date;
  title!: string;
  description!: string;
  imageName?: string;
  fileName?: string;
  [key: string]: string | Date | number | string[] | undefined;
}

export type List = {
  id: string,
  list: string[]
};
