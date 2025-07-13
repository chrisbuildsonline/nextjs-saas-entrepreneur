type LogLevel = "info" | "warn" | "error" | "debug"

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  metadata?: Record<string, any>
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private formatMessage(level: LogLevel, message: string, metadata?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    }
  }

  info(message: string, metadata?: Record<string, any>) {
    const logEntry = this.formatMessage("info", message, metadata)

    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, metadata || "")
    }

    // In production, send to logging service
    this.sendToLoggingService(logEntry)
  }

  warn(message: string, metadata?: Record<string, any>) {
    const logEntry = this.formatMessage("warn", message, metadata)

    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, metadata || "")
    }

    this.sendToLoggingService(logEntry)
  }

  error(message: string, error?: Error, metadata?: Record<string, any>) {
    const logEntry = this.formatMessage("error", message, {
      ...metadata,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    })

    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error, metadata || "")
    }

    this.sendToLoggingService(logEntry)
  }

  debug(message: string, metadata?: Record<string, any>) {
    if (!this.isDevelopment) return

    const logEntry = this.formatMessage("debug", message, metadata)
    console.debug(`[DEBUG] ${message}`, metadata || "")
  }

  private sendToLoggingService(logEntry: LogEntry) {
    if (process.env.NODE_ENV === "production") {
      // Send to your logging service (e.g., Sentry, LogRocket, etc.)
      // Example: Sentry.captureMessage(logEntry.message, logEntry.level)
    }
  }
}

export const logger = new Logger()
