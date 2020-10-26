export const get = (type: string) => (key: string) => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(type)) || {};
    } catch (e) {
      console.log(e);
    }
  }
  return ls[key];
};
export const set = (type: string) => <T>(key: string, value: T) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      type,
      JSON.stringify({
        [key]: value,
      })
    );
  }
};

export const getFromLS = (key: string) => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('layout')) || {};
    } catch (e) {}
  }
  return ls[key];
};
export const setToLS = (key: string, value: any) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      'layout',
      JSON.stringify({
        [key]: value,
      })
    );
  }
};
