import React from "react";
import {
  FaGraduationCap,
  FaBook,
  FaUniversity,
  FaChartLine,
} from "react-icons/fa";

const Paths: React.FC = () => {
  const pathCards = [
    {
      title: "Class XI",
      icon: <FaGraduationCap className="text-4xl text-blue-500" />,
      description: "Foundation for higher education",
      color: "bg-blue-100",
    },
    {
      title: "JEE",
      icon: <FaBook className="text-4xl text-green-500" />,
      description: "Engineering entrance preparation",
      color: "bg-green-100",
    },
    {
      title: "UPSC",
      icon: <FaUniversity className="text-4xl text-purple-500" />,
      description: "Civil services examination",
      color: "bg-purple-100",
    },
    {
      title: "GMAT",
      icon: <FaChartLine className="text-4xl text-red-500" />,
      description: "Business school admission test",
      color: "bg-red-100",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Learning Path
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pathCards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
              <button className="mt-4 bg-white px-4 py-2 rounded-full font-medium text-sm shadow-md hover:shadow-lg transition-shadow duration-300">
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paths;
