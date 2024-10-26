"use client";

import { cn } from "@/lib/utils";
import { useAppSession } from "@/stores";
import { TaskType } from "@/stores/slices/task-slice";

import TaskItem from "../task-item";

type TaskConsumerProps = {
  className?: string;
};
const TaskConsumer = ({ className }: TaskConsumerProps) => {
  const tasks = useAppSession((state) => state.tasks);

  return (
    <div className={cn("", className)}>
      <div className="flex w-full flex-col gap-4">
        {tasks
          .filter((it) => it.type === TaskType.VIDEO_GENERATION)
          .map((task) => (
            <TaskItem
              key={task.id}
              className="bg-white shadow-lg dark:bg-black"
            />
          ))}
      </div>
    </div>
  );
};

export default TaskConsumer;
