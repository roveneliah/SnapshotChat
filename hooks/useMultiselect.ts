import { useState } from "react";

export const useMultiselect = (items: any[]) => {
  const [selected, setSelected] = useState(items.map((item, i) => !i));
  const flipIndex = (index: number) => {
    setSelected((prevSelected) =>
      prevSelected.map((_, i) =>
        index === i ? !prevSelected[i] : prevSelected[i]
      )
    );
  };

  return [selected, flipIndex];
};
