import React from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UpdateResumeDetail } from "../../../../../service/GlobalApi";
import { Loader2, Brain } from "lucide-react";
import { toast } from "sonner";
import { genSummeryAiModel } from "../../../../../service/AiModel";
import { resumeSummaryPrompt } from "../../../../data/Prompt.js";

export default function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isloading, setIsloading] = useState(false);
  const [summery, setSummery] = useState("");
  const [aiGenSummeryList, setAiGenSummeryList] = useState();
  const params = useParams();

  async function genrateAiSummery() {
    try {
      if (resumeInfo?.jobTitle.length <= 0) {
        toast("Please Add Job title field");
      } else {
        setIsloading(true);
        let prompt = resumeSummaryPrompt(resumeInfo?.jobTitle.length);
        const result = await genSummeryAiModel(prompt);
        if (result) {
          setAiGenSummeryList(JSON.parse(result));
          setIsloading(false);
        }
      }
    } catch (err) {
      console.log("error", err);
      setIsloading(false);
    }
  }

  async function onSave(e) {
    try {
      setIsloading(true);
      e.preventDefault();
      const { resumeId } = params;
      const data = {
        summery: summery,
      };
      let res = await UpdateResumeDetail(resumeId, data);
      if (res) {
        enableNext(false);
        setIsloading(false);
        console.log(res);
        toast("Summery Updated.");
      }
    } catch (err) {
      console.log(err);
      enableNext(true);
      setIsloading(false);
    }
  }

  useEffect(() => {
    summery && setResumeInfo((prev) => ({ ...prev, summery: summery }));
  }, [summery]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4  mt-4">
        <h2 className="font-bold text-lg">Summery detail</h2>
        <p className="">Add Summery for you job title</p>{" "}
        <form onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summery</label>
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary flex gap-2 hover:text-primary"
              onClick={genrateAiSummery}
            >
              <Brain />
              Generate From AI
            </Button>
          </div>
          <Textarea
            required
            onChange={(e) => setSummery(e.target.value)}
            className="mt-5"
            defaultValue={resumeInfo?.summery}
            name="summery"
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={isloading}>
              {isloading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGenSummeryList && (
        <div>
          <h2 className="font-bold text-lg mt-5">Suggestions</h2>
          {aiGenSummeryList.map((sumList, i) => (
            <div
              key={i}
              className="border rounded-lg my-3  hover:scale-102 transition-all hover:shadow-xs cursor-pointer"
            >
              <h2 className="mt-2 mx-5 font-bold text-md">{sumList.level}</h2>
              <p className="mx-5 my-3 ">{sumList.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
