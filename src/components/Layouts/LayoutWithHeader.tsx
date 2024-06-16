import Header from "../Headers/Header.tsx";
import { ReactNode } from "react";

interface layoutProp{
    children: ReactNode
}
const LayoutWithHeader = ({ children }:layoutProp) => {
  return (
    <div className='w-full h-full'>
      <Header />
      {children}
    </div>
  );
};

export default LayoutWithHeader;
