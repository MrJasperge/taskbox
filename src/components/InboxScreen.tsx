import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { type RootState, type AppDispatch, fetchTasks } from "../lib/store";
import TaskList from "./TaskList";

export default function InboxScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.taskbox);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <p className="title-message">Ow nohw :(</p>
          <p className="subtitle-message">Somwethwing wwent wrowng.. Sowwy</p>
        </div>
      </div>
    );
  }
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList />
      <TaskList />
    </div>
  );
}
