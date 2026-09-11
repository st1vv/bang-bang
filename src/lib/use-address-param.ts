import { useState } from "react";
import { useSearchParams } from "react-router";

const ADDRESS_PARAM = "address";

// The wallet lives in the URL so it survives navigation between pages, a
// reload, and can be shared as a link.
export const useAddressParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedAddress = searchParams.get(ADDRESS_PARAM) ?? "";
  const [address, setAddress] = useState(submittedAddress);

  const submitAddress = (value: string) => {
    const trimmed = value.trim();
    if (trimmed === submittedAddress) return;

    setSearchParams(
      (params) => {
        if (trimmed) params.set(ADDRESS_PARAM, trimmed);
        else params.delete(ADDRESS_PARAM);
        return params;
      },
      { replace: true },
    );
  };

  return { address, setAddress, submittedAddress, submitAddress };
};
