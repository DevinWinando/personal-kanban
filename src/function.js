export const getId = (prevId) => {
  try {
    return prevId.reduce((a, b) => Math.max(a, b)) + 1;
  } catch {
    return 1;
  }
};
