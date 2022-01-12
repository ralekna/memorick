import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "./app/store";
import * as appHooks from "./app/hooks";
import { App } from "./App";
import { startApplication } from "./app/actions/actions";

describe(`Application integration tests`, () => {

  let dispatchMock: jest.Mock;
  let useAppSelectorMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    jest.spyOn(appHooks, "useAppDispatch").mockImplementation(() => dispatchMock);
    useAppSelectorMock = jest.fn();
    jest.spyOn(appHooks, "useAppSelector").mockImplementation(useAppSelectorMock);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })


  it(`should render loading text`, () => {
    useAppSelectorMock.mockReturnValue({game: null, loading: true});
    const { getByText } = render(
      <App />
    );

    expect(getByText("Loading...")).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledWith(startApplication());
  });

  it(`should render start game button`, () => {
    useAppSelectorMock.mockReturnValue({game: null, loading: false, availableCharactersCount: 12});
    const { getByText } = render(
      <App />
    );
    expect(getByText("Start new game")).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledWith(startApplication());
  });

});
