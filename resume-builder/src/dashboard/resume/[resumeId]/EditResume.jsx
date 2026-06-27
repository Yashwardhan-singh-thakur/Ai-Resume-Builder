import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../components/FormSection";
import ResumePreview from "../components/ResumePreview";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import ResumeDummyData from "../../../data/ResumeDummyData";

export default function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(ResumeDummyData);

  useEffect(() => {
    // let { resumeId } = params;
    // console.log(ResumeDummyData);
    setResumeInfo(ResumeDummyData);
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid gird-cols-1 md:grid-cols-2 p-10 gap-10  ">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}
