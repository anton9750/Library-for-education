const requestHistoryLog = {};
const MAXIMUM_REQUESTS_PER_WINDOW = 100;
const TIME_WINDOW_DURATION_MS = 60000; // 1 Minute Window Registry

module.exports = (req, res, next) => {
  const clientIP = req.ip || req.headers["x-forwarded-for"] || "anonymous_client_node";
  const currentTimestamp = Date.now();

  if (!requestHistoryLog[clientIP]) {
    requestHistoryLog[clientIP] = [];
  }

  // Filter historical record frames outside the active temporal tracker window boundary
  requestHistoryLog[clientIP] = requestHistoryLog[clientIP].filter(
    timestamp => (currentTimestamp - timestamp) < TIME_WINDOW_DURATION_MS
  );

  if (requestHistoryLog[clientIP].length >= MAXIMUM_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: "API rate limiting threshold reached. Structural system throttling applied.",
      retryAfterSeconds: Math.ceil(TIME_WINDOW_DURATION_MS / 1000)
    });
  }

  requestHistoryLog[clientIP].push(currentTimestamp);
  next();
};