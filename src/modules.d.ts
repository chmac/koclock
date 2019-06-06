declare module "seven-segment-display" {
  import * as React from "react";
  export interface DisplayProps {
    value: number;
    digitCount: number;
  }
  //   interface Display extends React.FC<DisplayProps> {}
  class Display extends React.Component<DisplayProps, any> {}
  export default Display;
}
