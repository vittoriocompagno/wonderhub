// Importing the type ReactNode from the React library.
// ReactNode is a type that represents any node that can be rendered by React, such as elements, strings, numbers, etc.
import type { ReactNode } from "react";

// Exporting a default function component named CreateLayout.
// This component takes a single prop 'children' which is of type ReactNode.
export default function CreateLayout({ children }: { children: ReactNode }) {
  // The component returns a div element with a top margin of 10 units.
  // The 'children' prop is rendered inside this div, allowing any nested components or elements to be displayed.
  return <div className="min-h-fit">{children}</div>;
}