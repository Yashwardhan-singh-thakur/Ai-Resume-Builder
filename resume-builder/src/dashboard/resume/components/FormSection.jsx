import { useContext } from "react";
import PersonalDetail from "./forms/PersonalDetail";

export default function FormSection() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div>
      Form Section <hr />
      <PersonalDetail resumeInfo={resumeInfo} />
    </div>
  );
}
