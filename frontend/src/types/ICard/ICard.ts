import { ICardData } from '../ICardData/ICardData';

export type ICard = {
  title: string;
  description: string;
  data: ICardData[];
  content?: JSX.Element;
};
