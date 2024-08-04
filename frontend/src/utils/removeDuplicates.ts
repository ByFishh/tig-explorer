import { isArray } from './isArray';

export const removeDuplicate = <T extends { id: string }>(arr: T[]) => {
  if (!isArray(arr)) return null;
  return Array.from(
    arr
      .reduce((map, obj) => map.set(obj.id, obj), new Map<string, T>())
      .values(),
  );
};
