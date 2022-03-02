import { compose, prop } from "ramda";
import { useState } from "react";

export const useForm = (initialValue) => {
  const [formText, setFormText] = useState(initialValue);
  const updateFormText = compose(setFormText, prop("value"), prop("target"));
  return [formText, updateFormText, setFormText];
};
