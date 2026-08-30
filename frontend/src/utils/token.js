// Safe storage utilities with multi-tier fallback (localStorage -> sessionStorage -> in-memory)
let memoryToken = null;

export const getToken = () => {
  try {
    const t = localStorage.getItem('authToken');
    if (t) return t;
  } catch (e) {
    // localStorage blocked
  }

  try {
    const t = sessionStorage.getItem('authToken');
    if (t) return t;
  } catch (e) {
    // sessionStorage blocked
  }

  return memoryToken;
};

export const setToken = (token) => {
  memoryToken = token;
  try {
    localStorage.setItem('authToken', token);
  } catch (e) {
    // ignore
  }

  try {
    sessionStorage.setItem('authToken', token);
  } catch (e) {
    // ignore
  }
};

export const removeToken = () => {
  memoryToken = null;
  try {
    localStorage.removeItem('authToken');
  } catch (e) {
    // ignore
  }

  try {
    sessionStorage.removeItem('authToken');
  } catch (e) {
    // ignore
  }
};
