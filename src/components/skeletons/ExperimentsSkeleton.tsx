import { Skeleton } from '../ui/skeleton'

interface Props {
  count?: number
  className?: string
}

const ExperimentsSkeleton = ({ count = 4, className = '' }: Props) => (
  <div className={`grid grid-cols-2 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className="h-32 w-full" />
    ))}
  </div>
)

export default ExperimentsSkeleton
