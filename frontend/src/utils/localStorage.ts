import { isArray } from './isArray';
import { tryCatch } from './tryCatch';

const _initializeStorage = (data: { key: string; defaultValue: unknown }) => {
  if (typeof window === 'undefined') return;
  const item = _getItem({ key: data.key });
  if (item && typeof item !== 'boolean') return;
  localStorage.setItem(data.key, JSON.stringify(data.defaultValue));
};

const _getItem = <T>(data: { key: string }): T | T[] | null => {
  if (typeof window === 'undefined') return null;
  if (!data.key) throw new Error('local storage key is empty');
  const item = localStorage.getItem(data.key);
  if (!item) return null;
  return JSON.parse(item);
};

const _setItem = <T>(data: { key: string; item: T }): void => {
  if (typeof window === 'undefined') return;
  if (!data.key) throw new Error('local storage key is empty');
  localStorage.setItem(data.key, JSON.stringify(data.item));
};

const _pushItem = <T>(data: { key: string; item: T }): void => {
  if (typeof window === 'undefined') return;
  const oldItems = getArray<T>(data.key);
  const newArray = [...oldItems, data.item];
  localStorage.setItem(data.key, JSON.stringify(newArray));
};

const _removeItem = <T extends { id: string }>(data: {
  key: string;
  id: string;
}): void => {
  if (typeof window === 'undefined') return;
  const items = getArray<T>(data.key);
  const newArray = items.filter((item) => item.id !== data.id);
  localStorage.setItem(data.key, JSON.stringify(newArray));
};

const _updateItem = <T extends { id: string }>(data: {
  key: string;
  updatedItem: T;
}): void => {
  if (typeof window === 'undefined') return;
  const items = getArray<T>(data.key);
  const newArray = items.map((item) =>
    item.id === data.updatedItem.id ? data.updatedItem : item,
  );
  localStorage.setItem(data.key, JSON.stringify(newArray));
};

const _findItemById = <T extends { id: string }>(data: {
  key: string;
  id: string;
}): T | null => {
  if (typeof window === 'undefined') return null;
  const oldItems = getArray<T>(data.key);
  const findById = oldItems.find((item) => item.id === data.id);
  if (!findById) return null;
  return findById;
};

const getArray = <T>(key: string): T[] => {
  try {
    const oldItems = _getItem({ key }) as T[];
    if (!isArray(oldItems))
      throw new Error('Local storage value is not an array type');
    return oldItems;
  } catch (error) {
    throw error;
  }
};

export const initializeStorage = _initializeStorage;
export const getItem = tryCatch(_getItem);
export const setItem = tryCatch(_setItem);
export const pushItem = tryCatch(_pushItem);
export const removeItem = tryCatch(_removeItem);
export const updateItem = tryCatch(_updateItem);
export const findItemById = tryCatch(_findItemById);
