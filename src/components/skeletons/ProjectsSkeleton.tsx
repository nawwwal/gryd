import { Skeleton } from '../ui/skeleton'

interface Props {
  count?: number
  className?: string
}

const ProjectsSkeleton = ({ count = 3, className = '' }: Props) => (
  <div className={`space-y-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className="h-40 w-full" />
    ))}
  </div>
)

export default ProjectsSkeleton
