const inMemorySystemAuditLedgerLog = [];

exports.registerSystemAuditRecord = (actionTypeString, userIdContextPointer, actionDescriptionString) => {
  const completeAuditEntryModel = {
    id: `log_${Math.random().toString(36).substr(2, 9)}`,
    userId: userIdContextPointer || "SYSTEM_DAEMON_PROPOSAL",
    action: actionTypeString,
    metadata: actionDescriptionString,
    timestamp: new Date()
  };
  inMemorySystemAuditLedgerLog.unshift(completeAuditEntryModel);
  console.log(`[AUDIT-LEDGER] Action registered: ${actionTypeString} -> ${actionDescriptionString}`);
  return completeAuditEntryModel;
};

exports.fetchAllSystemAuditLedgerLogs = () => {
  return inMemorySystemAuditLedgerLog;
};