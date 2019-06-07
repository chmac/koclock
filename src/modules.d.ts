declare module "seven-segment-display" {
  import * as React from "react";
  export interface DisplayProps {
    value: number | string;
    digitCount: number;
  }

  export interface DigitProps {
    value: number | string;
    onOpacity?: number;
    offOpacity?: number;
    color?: string;
    x?: number;
    y?: number;
  }

  //   interface Display extends React.FC<DisplayProps> {}
  export class Display extends React.Component<DisplayProps, any> {}
  export class Digit extends React.Component<DigitProps, any> {}
  export class Colon extends React.Component<{}, any> {}

  export default Display;
}
