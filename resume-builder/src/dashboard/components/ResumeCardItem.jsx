import React from "react";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResumeCardItem({ resume }) {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className="p-14 bg-secondary w-full flex items-center justify-center h-[280px] border border-primary rounded-lg  hover:scale-[1.05] transition-all hover:shadow-xs cursor-pointer">
        <Notebook />
      </div>
      <h2 className="text-center">{resume.title}</h2>
    </Link>
  );
}
