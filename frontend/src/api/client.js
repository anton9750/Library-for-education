const ARCHITECTURE_API_BASE_URL_TARGET = "http://localhost:5000/api";

export async function dispatchServerRESTRequest(resourcePath, httpMethodType = "GET", payloadDataBody = null) {
  const activeTokenReference = localStorage.getItem("enterprise_auth_access_token_pointer");
  
  const connectionHeaderPayload = {
    "Content-Type": "application/json",
    ...(activeTokenReference && { "Authorization": `Bearer ${activeTokenReference}` })
  };

  const networkQueryConfiguration = {
    method: httpMethodType,
    headers: connectionHeaderPayload,
    ...(payloadDataBody && { body: JSON.stringify(payloadDataBody) })
  };

  const rawNetworkResponse = await fetch(`${ARCHITECTURE_API_BASE_URL_TARGET}${resourcePath}`, networkQueryConfiguration);
  const functionalParsedJSONYield = await rawNetworkResponse.json();

  if (!rawNetworkResponse.ok) {
    throw new Error(functionalParsedJSONYield.error || "System internal processing array breakdown exception.");
  }

  return functionalParsedJSONYield;
}