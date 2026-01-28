FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run -r build
RUN pnpm deploy --filter=@scarce-pay/api --prod /prod/api
RUN pnpm deploy --filter=@scarce-pay/web --prod /prod/web

FROM base AS api
COPY --from=build /prod/api /app
COPY --from=build /app/apps/api/dist /app/dist
WORKDIR /app
EXPOSE 3001
CMD ["node", "dist/index.js"]

FROM base AS web
COPY --from=build /prod/web /app
COPY --from=build /app/apps/web/.output /app/.output
WORKDIR /app
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
