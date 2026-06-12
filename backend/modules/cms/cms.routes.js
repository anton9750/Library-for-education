const router = require("express").Router();
const cmsController = require("./cms.controller");
const routeGuardMiddleware = require("../../middleware/auth");
const scopeRBACGuard = require("../../middleware/rbac");

router.get("/dashboard-aggregates", routeGuardMiddleware, scopeRBACGuard(["ADMIN"]), cmsController.extractHighLevelPlatformAggregationMetrics);

module.exports = router;