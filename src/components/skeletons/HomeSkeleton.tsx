import { Skeleton } from '../ui/skeleton'

interface Props {
  className?: string
}

const HomeSkeleton = ({ className = '' }: Props) => (
  <div className={`space-y-12 py-16 ${className}`}>
    <Skeleton className="h-64 w-full" />
    <div className="space-y-8">
      <Skeleton className="h-8 w-1/2 mx-auto" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  </div>
)

export default HomeSkeleton
