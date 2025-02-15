import { useState, useEffect } from "react";
import { testService } from "../services/testService";
import { MockTest } from "../types/test";

export const useTest = (testId: string | undefined) => {
  const [test, setTest] = useState<MockTest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchTest = async () => {
      if (!testId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await testService.getMockTest(testId);
        if (mounted) {
          setTest(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch test");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchTest();

    return () => {
      mounted = false;
    };
  }, [testId]); // Only re-run if testId changes

  return { test, loading, error };
};
