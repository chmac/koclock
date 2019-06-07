declare module "seven-segment-display" {
  import * as React from "react";
  export interface DisplayProps {
    value: number | string;
    digitCount: number;
    strokeColor?: string;
  }

  export interface DigitProps {
    value: number | string;
    onOpacity?: number;
    offOpacity?: number;
    color?: string;
    strokeColor?: string;
    x?: number;
    y?: number;
  }

  export interface ColonProps {
    strokeColor?: string;
  }

  //   interface Display extends React.FC<DisplayProps> {}
  export class Display extends React.Component<DisplayProps, any> {}
  export class Digit extends React.Component<DigitProps, any> {}
  export class Colon extends React.Component<ColonProps, any> {}

  export default Display;
}
