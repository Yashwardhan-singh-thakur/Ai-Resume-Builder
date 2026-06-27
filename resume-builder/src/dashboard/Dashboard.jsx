import { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { getUserResume } from "../../service/GlobalApi.js";
import { resume } from "react-dom/server";
import { useUser } from "@clerk/react";
import ResumeCardItem from "./components/ResumeCardItem";

export default function Dashboard() {
  const [allResume, setAllResume] = useState([]);
  const { user } = useUser();

  async function showAllResume() {
    let res = await getUserResume(user?.primaryEmailAddress?.emailAddress);
    if (res) {
      setAllResume(res.data.data);
    }
  }

  useEffect(() => {
    user && showAllResume();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32 ">
      <h2 className="font-bold text-3xl"> My Resume</h2>
      <p>Start Creating Ai resume for your next job role</p>
      <div className="flex">
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
          <AddResume />
          {allResume.length > 0 &&
            allResume.map((resume, i) => (
              <ResumeCardItem resume={resume} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}
