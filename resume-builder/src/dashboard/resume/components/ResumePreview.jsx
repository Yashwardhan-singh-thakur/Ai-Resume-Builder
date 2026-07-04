import { useContext, useEffect } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillsPreview";
import { GetResumeDetail } from "../../../../service/GlobalApi.js";
import { useParams } from "react-router-dom";

export default function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  async function getResume() {
    const { resumeId } = params;
    let res = await GetResumeDetail(resumeId);
    console.log(res);
    if (res) {
      const {
        firstName,
        lastName,
        jobTitle,
        address,
        phone,
        email,
        summery,
        experience,
        education,
      } = res.data.data[0];
      setResumeInfo((prev) => ({
        ...prev,
        firstName: firstName,
        lastName: lastName,
        jobTitle: jobTitle,
        address: address,
        phone: phone,
        email: email,
        summery: summery,
        experience: experience ? experience : ["Experience nothing came"],
        education: education ? education : ["Education nothing came"],
      }));
    }
  }

  useEffect(() => {
    getResume();
    // console.log(resumeInfo);
  }, []);

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
