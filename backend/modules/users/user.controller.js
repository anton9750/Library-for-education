const authService = require("../auth/auth.service");

exports.retrievePaginatedUserCollectionRegistry = async (req, res) => {
  try {
    const pageIndexPointer = parseInt(req.query.page || 1, 10);
    const paginationLimitSize = parseInt(req.query.limit || 10, 10);
    
    const operationalSkipOffset = (pageIndexPointer - 1) * paginationLimitSize;
    const entireDatasetCollection = authService.internalStoreRef;

    const slicedTargetPageDataset = entireDatasetCollection.slice(
      operationalSkipOffset, 
      operationalSkipOffset + paginationLimitSize
    ).map(({ password, ...cleanProfile }) => cleanProfile);

    res.status(200).json({
      success: true,
      meta: {
        totalRecords: entireDatasetCollection.length,
        currentPage: pageIndexPointer,
        pageSize: paginationLimitSize,
        totalPages: Math.ceil(entireDatasetCollection.length / paginationLimitSize)
      },
      data: slicedTargetPageDataset
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.injectNewManualUserNodeRecord = async (req, res) => {
  try {
    const configurationResultNode = await authService.registerUserNode(req.body);
    res.status(201).json({ success: true, data: configurationResultNode });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};