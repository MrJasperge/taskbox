import type { Meta, StoryObj } from "@storybook/react-vite";

import TaskList from "./TaskList";

import * as TaskStories from "./Task.stories";

const meta = {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
  tags: ["autodocs"],
  args: {
    ...TaskStories.ActionsData,
  },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tasks: [
      { ...TaskStories.Default.args.task, id: "1", title: "Task Uno" },
      { ...TaskStories.Default.args.task, id: "2", title: "Task Two" },
      { ...TaskStories.Default.args.task, id: "3", title: "Task Drie" },
      { ...TaskStories.Default.args.task, id: "4", title: "Task Quatre" },
      { ...TaskStories.Default.args.task, id: "5", title: "Task Funf" },
      { ...TaskStories.Default.args.task, id: "6", title: "Task Zas" },
    ],
  },
};

export const WithPinnedTasks: Story = {
  args: {
    tasks: [
      ...Default.args.tasks.slice(0, 5),
      { id: "6", title: "Task Zas (pinned)", state: "TASK_PINNED" },
    ],
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Loading.args,
    loading: false,
  },
};
