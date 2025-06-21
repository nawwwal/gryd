import { Skeleton } from '../ui/skeleton'

interface Props {
  count?: number
}

const ExperimentsSkeleton = ({ count = 4 }: Props) => (
  <div className="magazine-container py-16">
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  </div>
)

export default ExperimentsSkeleton
