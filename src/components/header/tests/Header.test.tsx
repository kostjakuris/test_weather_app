import { fireEvent, render, screen } from "../../../test.utils";
import Header from "../Header";

describe("Toggle events", () => {
  test("input event", () => {
    render(<Header />);
    const input = screen.getByPlaceholderText(/enter city name/i);
    expect(screen.queryByDisplayValue("Zaporizhia")).not.toBeInTheDocument();
    fireEvent.input(input, {
      target: { value: "Zaporizhia" },
    });
    expect(screen.getByDisplayValue("Zaporizhia")).toBeInTheDocument();
  });
});
