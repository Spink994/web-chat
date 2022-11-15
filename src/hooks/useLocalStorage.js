import React, { useEffect, useState } from "react";

const IDENTIFIER = "web-chat-";

export default function useLocalStorage(key, initialValue) {
  const identifierKey = IDENTIFIER + key;

  const [storageValue, setStorageValue] = useState(() => {
    const unConvertedValue = localStorage.getItem(identifierKey);

    if (unConvertedValue !== null) return JSON.parse(unConvertedValue);

    if (typeof initialValue === "function") return initialValue();
    else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(identifierKey, JSON.stringify(storageValue));
  }, [identifierKey, storageValue]);

  return [storageValue, setStorageValue];
}
