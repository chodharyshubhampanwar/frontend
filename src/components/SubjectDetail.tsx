import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubject } from "../hooks/useSubject"; // or wherever your subject fetch hook is
import { SubjectProgressGrid } from "./SubjectProgressGrid";
import LoadingSpinner from "@/components/LoadingSpinner";

const SubjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const userId = "c22bae68-ff0d-4d3c-af78-c6d4fb10a920"; // e.g. from auth

  const { subject, isLoading } = useSubject(subjectId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!subject) {
    return <div className="p-4">Subject not found.</div>;
  }

  return (
    <div className="p-4">
      {/* Progress Grid for this subject */}
      <SubjectProgressGrid subject={subject} userId={userId} />

      <h2 className="text-xl font-bold mb-4">Subject: {subject.name}</h2>

      {subject.units?.length ? (
        <div className="space-y-4">
          {subject.units.map((unit) => (
            <div key={unit.id}>
              <h3 className="font-semibold text-lg mb-2">{unit.name}</h3>
              {unit.chapters?.length ? (
                <ul className="list-disc list-inside">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter.id} className="mb-1">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          // Go to a "Chapter Detail" route
                          navigate(`/chapter/${chapter.id}`);
                        }}
                      >
                        {chapter.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-600">No chapters yet.</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No units available for this subject.</div>
      )}
    </div>
  );
};

export default SubjectDetail;
