import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { experiencePrompt } from "../../../data/Prompt.js";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext.jsx";
import { genExperienceAiModel } from "../../../../service/AiModel.js";

import Editor, {
  BtnBold,
  BtnItalic,
  EditorProvider,
  Toolbar,
  BtnBulletList,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Separator,
} from "react-simple-wysiwyg";

export default function RichTextEditor({ textEditorChange, index }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isloading, setIsloading] = useState(false);
  const [value, setValue] = useState();

  function updateWorkSummery(htmlValue) {
    setValue(htmlValue);

    setResumeInfo((prev) => {
      const updatedExperience = [...prev.experience];

      updatedExperience[index] = {
        ...updatedExperience[index],
        workSummery: htmlValue,
      };

      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  }

  async function genrateAiSummery() {
    try {
      const title = resumeInfo.experience[index].title;
      console.log(title);
      if (!title || title.trim().length === 0) {
        toast("Please add position title field");
        return;
      }
      setIsloading(true);
      let prompt = experiencePrompt(resumeInfo.experience[index].title);
      const result = await genExperienceAiModel(prompt);
      if (result) {
        const exp = result.map((r) => `<li>${r}</li>`).join("");
        const htmlValue = `<ul>${exp}</ul>`;
        updateWorkSummery(htmlValue);
        setIsloading(false);
      }
    } catch (err) {
      console.log("error", err);
      setIsloading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-end mt-2 mb-3">
        <label htmlFor="" className="text-sm">
          Add Summery
        </label>
        <Button
          type="button"
          variant="outline"
          className="border-primary text-primary flex gap-2 hover:text-primary"
          onClick={genrateAiSummery}
        >
          {isloading ? null : <Brain />}
          {isloading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Generate From AI"
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            updateWorkSummery(e.target.value);
            textEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic /> <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}
