export const deepCopy = obj => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    copy[key] = deepCopy(obj[key]);
  }

  return copy;
};
