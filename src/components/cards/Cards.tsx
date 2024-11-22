import { Skeleton } from "../ui/skeleton";

export default function Card({
  loading,
  title,
  value,
  description,
  valueClassName = "text-[#464E5F]",
}: {
  loading: boolean;
  title: string;
  value: string;
  description: string;
  valueClassName?: string;
}) {
  if (loading) {
    // Loading Skeleton
    return (
      <div className="flex flex-col space-y-3 p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div>
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  // Cards
  return (
    <div className="h-56 w-full rounded-xl bg-muted/50 p-4 flex flex-col items-left justify-between bg-[#F3F6F9]">
      <div>
        <h1 className="text-3xl font-semibold text-[#464E5F]">{title}</h1>
      </div>
      <div>
        <h2 className={`text-6xl font-medium ${valueClassName}`}>{value}</h2>
      </div>
      <div>
        <h3 className="text-lg text-[#B5B5C3]">{description}</h3>
      </div>
    </div>
  );
}
