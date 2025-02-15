import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { testService } from "../services/testService";
import { useTestStore } from "../store/testStore";
import QuestionPanel from "./QuestionPanel";
import SidePanel from "./SidePanel";
import Timer from "./Timer";
import ResultScreen from "./ResultScreen";

export const TestContainer: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const { mockTest, setMockTest, isTestComplete } = useTestStore();

  const { data, isLoading } = useQuery(
    ["mockTest", testId],
    () => testService.getMockTest(testId!),
    {
      enabled: !!testId,
      onSuccess: (data) => setMockTest(data),
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isTestComplete) {
    return <ResultScreen />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content - 3/4 width */}
      <div className="w-3/4 p-4">
        <div className="mb-4">
          <Timer />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <QuestionPanel />
        </div>
      </div>
      {/* Side Panel - 1/4 width */}
      <div className="w-1/4 bg-white p-4 shadow-lg overflow-y-auto">
        <SidePanel />
      </div>
    </div>
  );
};

export default TestContainer;
