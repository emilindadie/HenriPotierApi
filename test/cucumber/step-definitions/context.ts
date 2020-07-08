export const threadLocals = {
    current: {},
    set: (key, val) => {
      threadLocals.current[key.name] = val;
    },
    get: (key) => threadLocals.current[key.name],
  };
