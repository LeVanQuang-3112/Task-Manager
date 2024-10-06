import { render, fireEvent, screen } from "@testing-library/react";
import { TaskFilter } from "../components/TaskFilter";
import { EStatus } from "../utils/constant";

describe("TaskFilter", () => {
  it("renders all filter options", () => {
    render(<TaskFilter filter={EStatus.ALL} onFilterChange={() => {}} />);

    expect(screen.getByRole("radio", { name: "All" })).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Completed" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Incomplete" })
    ).toBeInTheDocument();
  });

  it("calls onFilterChange with correct value when a filter is selected", () => {
    const mockOnFilterChange = jest.fn();
    render(
      <TaskFilter filter={EStatus.ALL} onFilterChange={mockOnFilterChange} />
    );

    fireEvent.click(screen.getByRole("radio", { name: "Completed" }));
    expect(mockOnFilterChange).toHaveBeenCalledWith("completed");

    fireEvent.click(screen.getByRole("radio", { name: "Incomplete" }));
    expect(mockOnFilterChange).toHaveBeenCalledWith("incomplete");

    // Clicking on the currently selected filter still triggers onFilterChange
    fireEvent.click(screen.getByRole("radio", { name: "Incomplete" }));
    expect(mockOnFilterChange).toHaveBeenCalledWith("incomplete");

    // Check total number of calls
    expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
  });

  it("highlights the currently selected filter", () => {
    const { rerender } = render(
      <TaskFilter filter={EStatus.ALL} onFilterChange={() => {}} />
    );

    expect(
      screen.getByRole("radio", { name: "All", checked: true })
    ).toBeInTheDocument();

    rerender(
      <TaskFilter filter={EStatus.COMPLETED} onFilterChange={() => {}} />
    );
    expect(
      screen.getByRole("radio", { name: "Completed", checked: true })
    ).toBeInTheDocument();

    rerender(
      <TaskFilter filter={EStatus.IN_COMPLETE} onFilterChange={() => {}} />
    );
    expect(
      screen.getByRole("radio", { name: "Incomplete", checked: true })
    ).toBeInTheDocument();
  });
});
