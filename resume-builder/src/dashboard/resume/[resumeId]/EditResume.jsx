import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../components/FormSection";
import ResumePreview from "../components/ResumePreview";

export default function EditResume() {
  const params = useParams();

  useEffect(() => {
    let { resumeId } = params;
    console.log(resumeId);
  }, []);

  return (
    <div className="grid gird-cols-1 md:grid-cols-2 p-10 gap-10  ">
      <FormSection />
      <ResumePreview />
    </div>
  );
}
