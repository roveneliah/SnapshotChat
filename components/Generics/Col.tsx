import { ReactChild } from "react";

interface Props {
  children: any;
  space?: number;
  className?: string;
}

export const Col = ({ children, space = 2, className = "" }: Props) => (
  <div className={`flex flex-col space-y-${space} ${className}`}>
    {children}
  </div>
);
