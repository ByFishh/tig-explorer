export const tryCatchAsync = (callback: Function) => async (data?: unknown) => {
  try {
    return await callback(data);
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
