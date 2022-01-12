import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { revealCard } from "../../app/actions/actions";
import * as appHooks from "../../app/hooks";
import { Card } from "./card";

describe(`Card.tsx unit tests`, () => {

  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    jest.spyOn(appHooks, "useAppDispatch").mockImplementation(() => dispatchMock);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it(`should dispatch revealCard action on mouse down`, () => {
    render(<Card id="666" index={2} image="my-img.png" open={false} />);
    expect(screen.getByTestId("card-2")).not.toHaveClass("open");
    fireEvent.mouseDown(screen.getByTestId("card-2"));
    expect(dispatchMock).toHaveBeenCalledWith(revealCard(2));
  });

  it(`should not dispatch revealCard action on mouse down if card is open`, () => {
    render(<Card id="666" index={2} image="my-img.png" open={true} />);
    expect(screen.getByTestId("card-2")).toHaveClass("open");
    fireEvent.mouseDown(screen.getByTestId("card-2"));
    expect(dispatchMock).not.toHaveBeenCalled();
  });
})