export const getId = (prevId) => {
  try {
    return prevId.reduce((a, b) => Math.max(a, b)) + 1;
  } catch {
    return 1;
  }
};

export function getAllLocalStorage() {
  const allLocalStorage = () => {
    let allLocalStorage = {},
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      allLocalStorage[keys[i]] = localStorage.getItem(keys[i]);
    }

    return allLocalStorage;
  };

  const datas = allLocalStorage();

  let parsedData = [];

  Object.keys(datas).forEach((data) => {
    try {
      parsedData.push(JSON.parse(datas[data]));
    } catch (e) {
      return false;
    }
  });

  return parsedData;
}
