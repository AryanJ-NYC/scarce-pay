-- CreateTable
CREATE TABLE "health_checks" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "checked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_checks_pkey" PRIMARY KEY ("id")
);

-- Seed initial health check
INSERT INTO health_checks (status, message, checked_at)
VALUES ('healthy', 'ScarcePay API is running', NOW());
