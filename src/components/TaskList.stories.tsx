import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { Meta, StoryObj } from "@storybook/react-vite";

import * as TaskStories from "./Task.stories";
import TaskList from "./TaskList";
import type { TaskData } from "../types";

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task Uno" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task Two" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task Drie" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task Quatre" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task Funf" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task Zas" },
  ] as TaskData[],
  status: "idle",
  error: null,
};

const Mockstore = ({
  taskboxState,
  children,
}: {
  taskboxState: typeof MockedState;
  children: React.ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "taskbox",
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta = {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/,
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
  ],
};

export const WithPinnedTasks: Story = {
  decorators: [
    (story) => {
      const pinnedTasks: TaskData[] = [
        ...MockedState.tasks.slice(0, 5),
        { id: "6", title: "Task Zas (pinned)", state: "TASK_PINNED" },
      ];

      return (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: pinnedTasks,
          }}
        >
          {story()}
        </Mockstore>
      );
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          status: "loading",
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
