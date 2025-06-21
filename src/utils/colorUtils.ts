export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'live':
      return 'text-gryd-accent bg-gryd-accent/10';
    case 'prototype':
      return 'text-gryd-text bg-gryd-soft/10';
    case 'ongoing':
      return 'text-gryd-accent bg-gryd-accent/10';
    case 'archived':
      return 'text-gryd-soft bg-gryd-soft/5';
    case 'draft':
      return 'text-gryd-soft bg-gryd-soft/10';
    default:
      return 'text-gryd-soft bg-gryd-soft/5';
  }
};

export const getIntensityColor = (intensity: string): string => {
  switch (intensity) {
    case 'high':
      return 'text-gryd-accent bg-gryd-accent/10';
    case 'medium':
      return 'text-gryd-text bg-gryd-soft/10';
    case 'low':
      return 'text-gryd-soft bg-gryd-soft/5';
    default:
      return 'text-gryd-soft bg-gryd-soft/5';
  }
};
