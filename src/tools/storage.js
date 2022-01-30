import _ from 'lodash';

export const getStorage = (name) => {
  const load = () => JSON.parse(localStorage.getItem(name));
  const save = (value) => localStorage.setItem(name, JSON.stringify(value));
  if (!load()) save({});

  return {
    set: (fields, value) => save(_.set(load(), fields, value)),
    get: (fields, defaultValue) =>
      fields ? _.get(load(), fields, defaultValue) : load() || defaultValue,
  };
};
