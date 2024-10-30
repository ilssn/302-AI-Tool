"use client";

import VideoPlayer from "@/components/common/video-player";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TaskItemProps = React.ComponentProps<typeof Card>;

const TaskItem = ({ className, ...props }: TaskItemProps) => {
  return (
    <Card className={cn("w-full] relative rounded-none", className)} {...props}>
      <CardHeader className="pb-2">
        <CardTitle>
          <div className="absolute left-5 top-[-4px] w-8 rounded-b-sm border bg-primary py-5 text-center text-white shadow-2xl">
            1
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex-items flex flex-col pl-8">
              <span className="text-md font-medium">Model</span>
              <span className="text-sans text-xs italic text-slate-400">
                2024/10/25 12:30
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={"outline"}
                className="hover:border-purple-500 hover:text-purple-500"
                size={"sm"}
                // onClick={() => onExtendVideo(task)}
              >
                拓展
              </Button>

              <Button
                variant={"outline"}
                size={"sm"}
                className="hover:border-red-500 hover:text-red-500"
                // onClick={() => onDeleteTask(task)}
              >
                删除
              </Button>
              <Button
                // disabled={!task.video}
                size={"sm"}
                // onClick={() => SystemManager.downloadVideo(task.video)}
              >
                下载
              </Button>
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-sm text-slate-400">
          Description prompt.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <VideoPlayer url="https://file.302ai.cn/gpt/imgs/20240821/4986a6b5b18240d6b4407cdc9d188a11.mp4" />
      </CardContent>
    </Card>
  );
};

export default TaskItem;
