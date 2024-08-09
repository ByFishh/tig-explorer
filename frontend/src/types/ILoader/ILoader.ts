export type ILoader = {
  isLoading: boolean;
  trigger: (isLoading: boolean) => void;
};
