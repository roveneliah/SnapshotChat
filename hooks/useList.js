import { useState } from "react";

export const useList = (initialValue) => {
  const [list, setList] = useState(initialValue);

  const addToList = (item) => {
    setList([...list, item]);
  };

  const removeAtIndex = (index) => {
    setList((list) => list.filter((_, i) => i !== index));
  };

  return [list, addToList, removeAtIndex];
};
