import { useQuery } from '@tanstack/react-query';

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealthCheck,
  });
};

const fetchHealthCheck = async (): Promise<HealthData> => {
  const res = await fetch('/api/health');
  if (!res.ok) throw new Error('Failed to fetch health status');
  return res.json();
};

type HealthData = {
  status: string;
  message: string;
  checkedAt: string;
};
