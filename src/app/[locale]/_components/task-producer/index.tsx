"use client";

import * as React from "react";

import { CaretSortIcon } from "@radix-ui/react-icons";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="video-model">视频模型</Label>
                  <Select>
                    <SelectTrigger id="video-model">
                      <SelectValue placeholder="选择模型" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="luma">Luma</SelectItem>
                      <SelectItem value="kling">Kling</SelectItem>
                      <SelectItem value="runway">Runway</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="video-prompt">视频内容</Label>
                  <Textarea
                    id="video-prompt"
                    rows={3}
                    placeholder="请输入您想要生成的视频内容"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">历史记录</Button>
            <Button>生成视频</Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TaskProducer;
