import { cn } from '@/app/lib/utils';
import { Status } from '@/types/data';

export default function Status({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const statusColor = {
    active: 'bg-lime-500',
    disabled: 'bg-gray-500',
    pending: 'bg-amber-500',
    blocked: 'bg-red-500',
  };

  return (
    <span className={cn('flex items-center gap-2 text-sm px-2 mr-4', className)}>
      <span className={cn('size-2 rounded-full', statusColor[status.color])} />
      <span>{status.label}</span>
    </span>
  );
}
