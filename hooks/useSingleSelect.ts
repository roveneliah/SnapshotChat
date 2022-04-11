import { useState } from "react";

export const useSingleSelect = (items: any[]) => {
  const [selected, setSelected] = useState(items.map((item, i) => !i));

  // make everything else false except this one
  const flipIndex = (index: number) => {
    setSelected((prevSelected) =>
      prevSelected.map((_, i) => (index === i ? true : false))
    );
  };

  return [selected, flipIndex];
};
