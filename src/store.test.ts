import { chooseReal } from "./store";

describe("chooseReal()", () => {
  it("chooses real at least 1 time in 500 executions", () => {
    let success = false;
    Array.from(Array(100)).forEach(() => {
      if (chooseReal()) {
        success = true;
      }
    });
    expect(success).toEqual(true);
  });
});
