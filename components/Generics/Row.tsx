import { ReactChild } from "react";

interface Props {
  children: any;
  space?: number;
  className?: string;
}

export const Row = ({ children, space = 2, className = "" }: Props) => (
  <div className={`flex flex-row space-x-${space} ${className}`}>
    {children}
  </div>
);
