const router = require("express").Router();
const auditService = require("./audit.service");
const routeGuardMiddleware = require("../../middleware/auth");
const scopeRBACGuard = require("../../middleware/rbac");

router.get("/", routeGuardMiddleware, scopeRBACGuard(["ADMIN"]), (req, res) => {
  res.status(200).json({
    success: true,
    ledgerDatasetCount: auditService.fetchAllSystemAuditLedgerLogs().length,
    entries: auditService.fetchAllSystemAuditLedgerLogs()
  });
});

module.exports = router;