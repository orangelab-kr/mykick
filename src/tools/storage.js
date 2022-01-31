import _ from 'lodash';
import { useState } from 'react';

export const useStorage = (name) => {
  name = `mykick-${name}`;
  const load = () => JSON.parse(localStorage.getItem(name));
  const save = (value) => localStorage.setItem(name, JSON.stringify(value));
  const remove = () => localStorage.removeItem(name);
  if (!load()) save({});

  return useState({
    setAll: (values) => (values ? save(values) : remove()),
    set: (field, value) => save(_.set(load(), field, value)),
    get: (field, defaultValue) =>
      field ? _.get(load(), field, defaultValue) : load() || defaultValue,
  })[0];
};
