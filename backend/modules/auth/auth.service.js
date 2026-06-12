const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auditService = require("../audit/audit.service");

// In-Memory Data Fallback Matrix for Isolated Script Runtime Environment
const localizedUserDatabaseStore = [];

exports.registerUserNode = async (registrationPayload) => {
  const { email, password, name, role } = registrationPayload;
  const standardSanitizedEmail = email.toLowerCase().trim();

  const userExists = localizedUserDatabaseStore.some(user => user.email === standardSanitizedEmail);
  if (userExists) {
    throw new Error("A system user profile node already handles registrations tied to that specific unique identifier address.");
  }

  const workFactorSalt = await bcrypt.genSalt(10);
  const computationallyHashedPassword = await bcrypt.hash(password, workFactorSalt);

  const freshUserNode = {
    id: `usr_${Math.random().toString(36).substr(2, 9)}`,
    email: standardSanitizedEmail,
    password: computationallyHashedPassword,
    name: name || "Anonymous Employee Node",
    role: (role || "USER").toUpperCase(),
    isActive: true,
    createdAt: new Date()
  };

  localizedUserDatabaseStore.push(freshUserNode);
  auditService.registerSystemAuditRecord("USER_REGISTRATION_SUCCESS", freshUserNode.id, `Profile mapping linked onto node ${freshUserNode.id}`);
  
  const { password: _, ...sanitizedReturnData } = freshUserNode;
  return sanitizedReturnData;
};

exports.authenticateUserNode = async (email, password) => {
  const standardSanitizedEmail = email.toLowerCase().trim();
  const targetedUserNode = localizedUserDatabaseStore.find(user => user.email === standardSanitizedEmail);
  
  if (!targetedUserNode) {
    throw new Error("Invalid access criteria profile parameters provided to the security validation check engine.");
  }

  const evaluatesTrue = await bcrypt.compare(password, targetedUserNode.password);
  if (!evaluatesTrue) {
    throw new Error("Invalid access criteria profile parameters provided to the security validation check engine.");
  }

  const signedAccessToken = jwt.sign(
    { id: targetedUserNode.id, role: targetedUserNode.role, email: targetedUserNode.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );

  const signedRefreshToken = jwt.sign(
    { id: targetedUserNode.id },
    process.env.JWT_REFRESH_SECRET || "refresh",
    { expiresIn: "7d" }
  );

  auditService.registerSystemAuditRecord("USER_AUTHENTICATION_SUCCESS", targetedUserNode.id, "JWT Security grant payload set successfully.");

  return {
    user: {
      id: targetedUserNode.id,
      email: targetedUserNode.email,
      name: targetedUserNode.name,
      role: targetedUserNode.role
    },
    token: signedAccessToken,
    refreshToken: signedRefreshToken
  };
};

// Expose internal store pointers for multi-module integration visibility mapping matrices
exports.internalStoreRef = localizedUserDatabaseStore;