import { useEffect, useState } from 'react';

export default function useResizeHeight(height?: string): string | undefined {
  const [resizedHeight, setHeight] = useState<string>();

  useEffect(() => {
    if (height !== undefined && resizedHeight !== height) {
      setHeight(height);
    }
  });

  return resizedHeight;
}