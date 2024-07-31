export type S = {
  tigPrice: number;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  SET_TIG_PRICE = 'set_tig_price',
}
