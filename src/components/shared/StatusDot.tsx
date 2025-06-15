
interface StatusDotProps {
  status: 'active' | 'completed' | 'pending';
  className?: string;
}

const StatusDot = ({ status, className = '' }: StatusDotProps) => {
  const statusColors = {
    active: 'bg-green-500',
    completed: 'bg-blue-500',
    pending: 'bg-yellow-500'
  };

  return (
    <div 
      className={`w-2 h-2 rounded-full ${statusColors[status]} ${className}`}
      style={{ animation: 'pulse-dot 2s infinite' }}
    />
  );
};

export default StatusDot;
