import { Immutable } from '@/types/Immutable/Immutable';
import { isArray } from './isArray';

export const _addArray = <T extends { id: string }>(
  arr: Immutable<T[]> | null,
  item: Immutable<T> | null,
): Immutable<T[]> | null => {
  if (!arr || !isArray(arr) || !item) return null;
  return [...arr, item];
};

export const _removeArray = <T extends { id: string }>(
  arr: Immutable<T[]> | null,
  id: string | null,
): Immutable<T[]> | null => {
  if (!arr || !isArray(arr) || !id) return null;
  return arr.filter((a) => a.id !== id);
};

export const _updateArray = <T extends { id: string }>(
  arr: Immutable<T[]> | null,
  item: Immutable<T> | null,
): Immutable<T[]> | null => {
  if (!arr || !isArray(arr) || !item) return null;
  return arr.map((a) => (a.id === item.id ? { ...a, ...item } : a));
};

export const _findById = <T extends { id: string }>(
  arr: T[] | null,
  id: string | null,
): T | null => {
  if (!isArray(arr) || !arr || !id) return null;
  const item = arr.find((a) => a.id === id);
  if (!item) return null;
  return item;
};
