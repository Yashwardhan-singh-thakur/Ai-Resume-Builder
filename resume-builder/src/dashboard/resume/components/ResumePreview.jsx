import { useContext } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillsPreview";

export default function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      <ExperiencePreview resumeInfo={resumeInfo} />
      <EducationPreview resumeInfo={resumeInfo} />
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
}
