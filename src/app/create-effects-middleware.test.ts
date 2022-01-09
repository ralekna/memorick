// import * as jest from "jest";
import { render, screen, waitFor } from "@testing-library/react";
import { createEffectsMiddleware } from "./create-effects-middleware";

describe(`createEffectsMiddleware()`, () => {

  type State = {
    count: number;
  };

  function increaseCount(payload: number = 1) {
    return {
      type: "increaseCount",
      payload
    };
  }

  function logStartup() {
    return {
      type: "logStartup"
    };
  }

  function unrelated() {
    return {
      type: "unrelated"
    };
  }

  afterEach(() => {
    jest.clearAllMocks();
  })

  it(`should match an action and execute effect`, () => {
    const increaseCountAction = increaseCount(1);
    const logStartupAction = logStartup()
    const getStateMock = jest.fn();
    const dispatchMock = jest.fn();
    const apiMock = {
      getState: getStateMock,
      dispatch: dispatchMock
    }
    const nextMock = jest.fn((value: any) => value);
    const actionHandlerMock = jest.fn();
    const apiHandlerMock = jest.fn();
    const nextHandlerMock = jest.fn();
    const middleware = createEffectsMiddleware<State>([
      ["increaseCount", (api) => {
        apiHandlerMock(api);
        api.getState();
        api.dispatch(logStartupAction);
        return (next) => {
          next(logStartupAction);
          nextHandlerMock(next);
          return (action) => {
            actionHandlerMock(action);
            return next(action);
          };
        };
      }]
    ]);

    expect(middleware(apiMock as any)(nextMock as any)(increaseCountAction)).toBe(increaseCountAction);
    expect(apiHandlerMock).toHaveBeenCalledWith(apiMock);
    expect(getStateMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(logStartupAction);
    expect(nextMock).toHaveBeenNthCalledWith(1, logStartupAction);
    expect(nextHandlerMock).toHaveBeenCalledWith(nextMock);
    expect(actionHandlerMock).toHaveBeenCalledWith(increaseCountAction);
    expect(nextMock).toHaveBeenNthCalledWith(2, increaseCountAction);
  });
});