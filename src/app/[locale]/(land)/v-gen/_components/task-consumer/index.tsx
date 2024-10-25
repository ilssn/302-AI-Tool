import { cn } from "@/lib/utils";

import TaskItem from "../task-item";

type TaskConsumerProps = {
  className?: string;
};
const TaskConsumer = ({ className }: TaskConsumerProps) => {
  return (
    <div className={cn("", className)}>
      <div className="flex w-full flex-col gap-4">
        <TaskItem className="bg-white shadow-lg dark:bg-black" />
        <TaskItem className="bg-white shadow-lg dark:bg-black" />
      </div>
    </div>
  );
};

export default TaskConsumer;
