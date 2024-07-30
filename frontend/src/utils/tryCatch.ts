export const tryCatch = (callback: Function) => (data?: unknown) => {
  try {
    return callback(data);
  } catch (err: any) {
    throw err;
  }
};
