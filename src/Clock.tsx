import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Display from "seven-segment-display";
import { State } from "./store";

const Clock: React.FC<Props> = ({ value }) => {
  return <Display value={value} digitCount={4} />;
};

const mapStateToProps = (state: State) => {
  return {
    value: state.showMintues
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type Props = StateProps;

export default connect(mapStateToProps)(Clock);
