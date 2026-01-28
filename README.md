# ScarcePay

Self-hosted, multi-chain crypto invoicing system. Accept payments in any cryptocurrency and settle to your own wallets.

## 1-Click Deployment

```bash
git clone https://github.com/AryanJ-NYC/scarce-pay.git
cd scarce-pay
export SCARCEPAY_HOST="pay.example.com"
. ./scarcepay-setup.sh -i
```

The setup script will:
- Check for Docker and Docker Compose
- Generate a secure PostgreSQL password
- Create `.env` file with your configuration
- Configure Caddy for automatic HTTPS
- Build and start all services

Point your DNS to the server, and you're live at `https://pay.example.com`.

## Development

```bash
pnpm install
pnpm dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3001

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | TanStack Start |
| API | Hono |
| Database | PostgreSQL |
| Styling | Tailwind CSS v4 |
| Reverse Proxy | Caddy (auto HTTPS) |
| Monorepo | Turborepo |

## Project Structure

```
scarce-pay/
├── apps/
│   ├── api/     # Hono backend
│   └── web/     # TanStack Start frontend
├── packages/    # Shared configs
├── scarcepay-setup.sh
└── docker-compose.yml
```

## Links

- [GitHub Issues](https://github.com/AryanJ-NYC/scarce-pay/issues) - Roadmap and tasks
