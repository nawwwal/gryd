import { Skeleton } from '../ui/skeleton'

interface Props {
  count?: number
}

const ProjectsSkeleton = ({ count = 3 }: Props) => (
  <div className="magazine-container py-16">
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full" />
      ))}
    </div>
  </div>
)

export default ProjectsSkeleton
