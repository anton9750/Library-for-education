const fs = require("fs");
const path = require("path");

// Mock Local S3 Object Storage Asset Persistence Driver Core Abstraction Layer
const LOCAL_STORAGE_DIR_TARGET = path.join(__dirname, "../uploads_mock_s3");

exports.persistAssetDataPayloadStream = (assetIdentiferString, rawBinaryBufferData) => {
  if (!fs.existsSync(LOCAL_STORAGE_DIR_TARGET)) {
    fs.mkdirSync(LOCAL_STORAGE_DIR_TARGET, { recursive: true });
  }
  
  const targetedWritePathDestination = path.join(LOCAL_STORAGE_DIR_TARGET, assetIdentiferString);
  fs.writeFileSync(targetedWritePathDestination, rawBinaryBufferData);
  
  return {
    absoluteAssetPathPointer: targetedWritePathDestination,
    virtualResourceURLLocation: `/static/assets/mock_s3/${assetIdentiferString}`
  };
};