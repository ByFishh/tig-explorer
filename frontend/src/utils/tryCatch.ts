export const tryCatch = (callback: Function) => (data?: unknown) => {
  try {
    return callback(data);
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
