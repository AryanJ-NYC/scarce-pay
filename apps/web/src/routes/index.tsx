import { createFileRoute } from '@tanstack/react-router';
import { useHealthCheck } from '../hooks/use-health-check';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  const { data: health, isLoading, error } = useHealthCheck();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8">ScarcePay</h1>
        <HealthStatus health={health} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}

function HealthStatus({ health, isLoading, error }: HealthStatusProps) {
  if (isLoading) {
    return <p className="text-slate-400">Loading health status...</p>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <p className="text-red-400">{error.message}</p>
      </div>
    );
  }

  if (!health) {
    return <p className="text-slate-400">No health data available</p>;
  }

  const isHealthy = health.status === 'healthy';

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
        <p className={`font-semibold ${isHealthy ? 'text-green-400' : 'text-red-400'}`}>
          {health.status.toUpperCase()}
        </p>
      </div>
      <p className="text-slate-300">{health.message}</p>
      <p className="text-slate-500 text-sm mt-2">
        Last checked: {new Date(health.checkedAt).toLocaleString()}
      </p>
    </div>
  );
}

type HealthData = {
  status: string;
  message: string;
  checkedAt: string;
};

type HealthStatusProps = {
  health: HealthData | undefined;
  isLoading: boolean;
  error: Error | null;
};
