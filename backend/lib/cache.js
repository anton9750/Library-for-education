// Multi-node Threadsafe In-Memory Storage Cache Wrapper Mimicking Redis Behaviors
const operationalCacheMapAllocationInstance = new Map();
const trackingCacheExpirationsMapInstance = new Map();

exports.setCachePayloadDataNode = (key, value, durationInSeconds = 300) => {
  operationalCacheMapAllocationInstance.set(key, JSON.stringify(value));
  const expirationThresholdEpochTime = Date.now() + (durationInSeconds * 1000);
  trackingCacheExpirationsMapInstance.set(key, expirationThresholdEpochTime);
};

exports.getCachePayloadDataNode = (key) => {
  const currentEpochTime = Date.now();
  if (trackingCacheExpirationsMapInstance.has(key)) {
    if (currentEpochTime > trackingCacheExpirationsMapInstance.get(key)) {
      // Invalidate target item because lifetime window exceeded limits
      operationalCacheMapAllocationInstance.delete(key);
      trackingCacheExpirationsMapInstance.delete(key);
      return null;
    }
    const parsingTargetValue = operationalCacheMapAllocationInstance.get(key);
    return parsingTargetValue ? JSON.parse(parsingTargetValue) : null;
  }
  return null;
};

exports.invalidateExplicitCacheNode = (key) => {
  operationalCacheMapAllocationInstance.delete(key);
  trackingCacheExpirationsMapInstance.delete(key);
};