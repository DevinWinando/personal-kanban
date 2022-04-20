export const getId = (prevId) => {
  try {
    return prevId.reduce((a, b) => Math.max(a, b)) + 1;
  } catch {
    return 1;
  }
};

export const getAllLocalStorage = () => {
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
};

export const handleChange = (e, state, setState) => {
  let name = e.target.name;
  let value = e.target.value;
  state[name] = value;

  setState(state);
};
