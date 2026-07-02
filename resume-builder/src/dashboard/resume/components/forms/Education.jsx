import { useEffect, useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { Loader2 } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";

const fromField = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState([fromField]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, education: educationList }));
  }, [educationList]);

  function handleChange(i, e) {
    const { name, value } = e.target;

    setEducationList((prev) => {
      const newEntries = [...prev];
      newEntries[i] = {
        ...newEntries[i],
        [name]: value,
      };
      return newEntries;
    });
  }

  function handleTextEditor(e, name, i) {
    const value = e.target.value;
    setEducationList((prev) => {
      const newEntries = [...prev];
      newEntries[i] = {
        ...newEntries[i],
        [name]: value,
      };
      return newEntries;
    });
  }

  function AddNewEducation() {
    setEducationList((prev) => [...prev, fromField]);
  }

  function RemoveEducation() {
    setEducationList((prev) => prev.slice(0, -1));
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4  mt-4">
      <h2 className="font-bold text-lg">Education</h2>
      <p className="">Add Your educational details</p>
      <div>
        {educationList.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
          >
            <div className="col-span-2">
              <label className="text-sm" htmlFor="">
                University Name
              </label>
              <Input
                name="universityName"
                onChange={(e) => handleChange(i, e)}
              />
            </div>
            <div>
              <label className="text-sm" htmlFor="">
                Degree
              </label>
              <Input name="degree" onChange={(e) => handleChange(i, e)} />
            </div>
            <div>
              <label className="text-sm" htmlFor="">
                Major
              </label>
              <Input name="major" onChange={(e) => handleChange(i, e)} />
            </div>

            <div>
              <label className="text-sm" htmlFor="">
                Start date
              </label>
              <Input
                type="date"
                name="startDate"
                onChange={(e) => handleChange(i, e)}
              />
            </div>
            <div>
              <label className="text-sm" htmlFor="">
                End date
              </label>
              <Input
                type="date"
                name="endDate"
                onChange={(e) => handleChange(i, e)}
              />
            </div>

            <div className="col-span-2">
              <RichTextEditor
                index={i}
                textEditorChange={(e) => handleTextEditor(e, "workSummery", i)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="text-primary"
            onClick={AddNewEducation}
          >
            + Add More Eduction
          </Button>
          {educationList.length > 1 && (
            <Button
              variant="outline"
              className="text-red-400"
              onClick={RemoveEducation}
            >
              - Remove
            </Button>
          )}
        </div>
        <Button type="submit" disabled={isloading}>
          {isloading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
