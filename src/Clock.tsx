import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Display, { Colon } from "seven-segment-display";
import { State } from "./store";

const Clock: React.FC<Props> = ({ value }) => {
  const values = value.split(":");
  return (
    <div style={styles.wrapper}>
      <div style={styles.leftDigits}>
        <Display value={values[0]} digitCount={2} />
      </div>
      <div style={styles.colon}>
        <Colon />
      </div>
      <div style={styles.rightDigits}>
        <Display value={values[1]} digitCount={2} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    value: moment(state.showMintues * 60 * 1e3).format("hh:mm")
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type Props = StateProps;

export default connect(mapStateToProps)(Clock);

const styles = {
  wrapper: {
    display: "flex"
  },
  leftDigits: {
    flex: 2,
    marginRight: "-17vh"
  },
  rightDigits: {
    flex: 2,
    marginLeft: "-12vh"
  },
  colon: {
    flex: 1
  }
};
