import { useEffect, useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { Loader2 } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";

const fromField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

export default function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([fromField]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, experience: experienceList }));
  }, [experienceList]);

  function handleChange(i, e) {
    const { name, value } = e.target;

    setExperienceList((prev) => {
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
    setExperienceList((prev) => {
      const newEntries = [...prev];
      newEntries[i] = {
        ...newEntries[i],
        [name]: value,
      };
      return newEntries;
    });
  }

  function AddNewExperinece() {
    setExperienceList((prev) => [...prev, fromField]);
  }

  function RemoveExperinece() {
    setExperienceList((prev) => prev.slice(0, -1));
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4  mt-4">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p className="">Add Your previous Job experience</p>
      <div>
        {experienceList.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
          >
            <div>
              <label className="text-sm" htmlFor="">
                Position Title
              </label>
              <Input name="title" onChange={(e) => handleChange(i, e)} />
            </div>
            <div>
              <label className="text-sm" htmlFor="">
                Company Name
              </label>
              <Input name="companyName" onChange={(e) => handleChange(i, e)} />
            </div>
            <div>
              <label className="text-sm" htmlFor="">
                City
              </label>
              <Input name="city" onChange={(e) => handleChange(i, e)} />
            </div>
            <div>
              <label className="text-sm" htmlFor="">
                State
              </label>
              <Input name="state" onChange={(e) => handleChange(i, e)} />
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
            onClick={AddNewExperinece}
          >
            + Add More Experience
          </Button>
          {experienceList.length > 1 && (
            <Button
              variant="outline"
              className="text-red-400"
              onClick={RemoveExperinece}
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
