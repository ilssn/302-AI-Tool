import { DotLoader } from "@/components/common/loader-renderer";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <DotLoader />
    </div>
  );
}
