import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Display, { Colon } from "seven-segment-display";
import { State } from "./store";

const Clock: React.FC<Props> = ({ value }) => {
  const values = value.split(":");
  return (
    <div style={styles.outer}>
      <div style={styles.wrapper}>
        <div style={styles.leftDigits}>
          <Display value={values[0]} digitCount={2} strokeColor="#000" />
        </div>
        <div style={styles.colon}>
          <Colon strokeColor="#000" />
        </div>
        <div style={styles.rightDigits}>
          <Display value={values[1]} digitCount={2} strokeColor="#000" />
        </div>
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
  outer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    maxWidth: "80%",
    flex: 1,
    display: "flex"
  },
  leftDigits: {
    flex: 2,
    marginRight: "-15vh"
  },
  rightDigits: {
    flex: 2,
    marginLeft: "-10vh"
  },
  colon: {
    flex: 1
  }
};
