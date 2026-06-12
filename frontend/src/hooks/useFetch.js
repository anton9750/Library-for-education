import { useState, useEffect } from "react";

export default function useFetch(endpointTargetUrl) {
  const [retrievedDataset, setRetrievedDataset] = useState(null);
  const [networkProgressLoading, setNetworkProgressLoading] = useState(true);
  const [capturedErrorState, setCapturedErrorState] = useState(null);

  useEffect(() => {
    let activeExecutionThreadValid = true;
    setNetworkProgressLoading(true);

    fetch(endpointTargetUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Network error pipe resolution triggered fault state.");
        }
        return response.json();
      })
      .then((payloadData) => {
        if (activeExecutionThreadValid) {
          setRetrievedDataset(payloadData);
          setNetworkProgressLoading(false);
        }
      })
      .catch((error) => {
        if (activeExecutionThreadValid) {
          setCapturedErrorState(error);
          setNetworkProgressLoading(false);
        }
      });

    return () => {
      activeExecutionThreadValid = false;
    };
  }, [endpointTargetUrl]);

  return { retrievedDataset, networkProgressLoading, capturedErrorState };
}