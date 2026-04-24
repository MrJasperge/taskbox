import type { RootState, AppDispatch } from "../lib/store";

import Task from "./Task";

import { useDispatch, useSelector } from "react-redux";

import { updateTaskState } from "../lib/store";

export default function TaskList() {
  const tasks = useSelector((state: RootState) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((task) => task.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((task) => task.state !== "TASK_PINNED"),
    ];
    return tasksInOrder;
  });
  const { status } = useSelector((state: RootState) => state.taskbox);
  const dispatch = useDispatch<AppDispatch>();
  const pinTask = (value: string) => {
    const task = tasks.find((task) => task.id === value);
    const newState =
      task?.state === "TASK_PINNED" ? "TASK_INBOX" : "TASK_PINNED";
    dispatch(updateTaskState({ id: value, newTaskState: newState }));
  };
  const archiveTask = (value: string) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbo" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key="loading">
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

  return (
    <div className="list-items" data-testid="success" key="success">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={pinTask}
          onArchiveTask={archiveTask}
        />
      ))}
    </div>
  );
}
