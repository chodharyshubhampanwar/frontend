import axios from "axios";

async function SubmitTest(testStartTime, questions) {
  const testEndTime = new Date();
  const totalTimeTaken = Math.floor((testEndTime - testStartTime) / 1000);
  try {
    const response = await axios.post("http://localhost:5000/api/submitTest", {
      testName: "Your Test Name",
      attemptedDate: testStartTime,
      questions: questions,
      completionTime: totalTimeTaken,
      category: "Your Category",
      topic: "Your Topic",
    });

    if (response.data.success) {
      console.log("Test result saved successfully");
    } else {
      console.log("Error submitting test");
    }
  } catch (error) {
    console.error("Error submitting test", error);
  }
}

export default SubmitTest;
