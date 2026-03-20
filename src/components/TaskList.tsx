import type { TaskData } from "../types";

import Task from "./Task";

type TaskListProps = {
  loading?: boolean;
  tasks: TaskData[];
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
};

export default function TaskList({
  loading = false,
  tasks,
  onPinTask,
  onArchiveTask,
}: TaskListProps) {
  const events = {
    onPinTask,
    onArchiveTask,
  };
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbo" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks, lucky you!</p>
          <p className="subitle-message">Leun maar lekker achterover</p>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((task) => task.state === "TASK_PINNED"),
    ...tasks.filter((task) => task.state !== "TASK_PINNED"),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
