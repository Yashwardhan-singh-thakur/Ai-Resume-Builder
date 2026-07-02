import { Button } from "@/components/ui/button";
import PersonalDetail from "./forms/PersonalDetail";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import { ArrowRight, LayoutGrid, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function FormSection() {
  const [activeFormIndex, setActiveFromIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);

  function incrementIndex() {
    setActiveFromIndex((prev) => prev + 1);
    setEnableNext(true);
  }
  function decrementIndex() {
    setActiveFromIndex((prev) => prev - 1);
    setEnableNext(false);
  }

  return (
    <div>
      <div className="flex justify-between">
        <Button variant="outline" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button onClick={decrementIndex}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            // disabled={enableNext}
            className="flex gap-2"
            onClick={incrementIndex}
          >
            {activeFormIndex} Next <ArrowRight />
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 4 ? (
        <Education enableNext={(v) => setEnableNext(v)} />
      ) : null}
    </div>
  );
}
