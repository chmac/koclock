import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Display from "seven-segment-display";

const Clock = ({ value }) => {
  return <Display value={value} digitCount={4} />;
};

const mapStateToProps = state => {
  return {
    value: moment(state.show * 60 * 1e3).format("hhmm")
  };
};

export default connect(mapStateToProps)(Clock);
