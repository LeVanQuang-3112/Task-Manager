import React from "react";
import { Radio } from "antd";
import { EStatus } from "../utils/constant";

type FilterType = EStatus.ALL | EStatus.COMPLETED | EStatus.IN_COMPLETE;

interface TaskFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <Radio.Group
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <Radio.Button value={EStatus.ALL}>All</Radio.Button>
      <Radio.Button value={EStatus.COMPLETED}>Completed</Radio.Button>
      <Radio.Button value={EStatus.IN_COMPLETE}>Incomplete</Radio.Button>
    </Radio.Group>
  );
};
