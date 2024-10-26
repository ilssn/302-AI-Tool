"use client";

import * as React from "react";

import { CaretSortIcon } from "@radix-ui/react-icons";

import VideoForm from "@/components/forms/v-gen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const TaskProducer = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Card className="w-full rounded-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex-1">
            <CardTitle>创建视频</CardTitle>
            <CardDescription>共有1 / 4条视频生成中</CardDescription>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <VideoForm />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      <CardFooter className="flex justify-between">
        <Button variant="outline">历史记录</Button>
        <Button
          variant="outline"
          className="hover:border-red-500 hover:text-red-500"
        >
          清空任务
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskProducer;
