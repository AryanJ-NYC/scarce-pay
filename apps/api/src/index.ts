import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { prisma } from './lib/prisma.js';

const app = new Hono();

app.get('/api/health', async (c) => {
  const healthCheck = await prisma.healthCheck.findFirst({
    orderBy: { checkedAt: 'desc' },
  });

  if (!healthCheck) {
    return c.json({ status: 'unknown', message: 'No health check data found' }, 503);
  }

  return c.json({
    status: healthCheck.status,
    message: healthCheck.message,
    checkedAt: healthCheck.checkedAt,
  });
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
