import _ from 'lodash';

export const getStorage = (name) => {
  name = `mykick-${name}`;
  const load = () => JSON.parse(localStorage.getItem(name));
  const save = (value) => localStorage.setItem(name, JSON.stringify(value));
  if (!load()) save({});

  return {
    setAll: save,
    set: (field, value) => save(_.set(load(), field, value)),
    get: (field, defaultValue) =>
      field ? _.get(load(), field, defaultValue) : load() || defaultValue,
  };
};
