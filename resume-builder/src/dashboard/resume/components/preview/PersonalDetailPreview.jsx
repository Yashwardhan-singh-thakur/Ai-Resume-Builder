import React from "react";

export default function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName ? resumeInfo?.firstName : "Yashwardhan"}
        {resumeInfo?.lastName ? resumeInfo?.lastName : "Singh thakur"}
      </h2>
      <h2></h2>
      <h2 className="font-medium text-sm text-center">
        {resumeInfo?.jobTitle ? resumeInfo?.jobTitle : "Full stack developer"}
      </h2>
      <h2
        className="font-normal text-xs text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {" "}
        {resumeInfo?.address
          ? resumeInfo?.address
          : "English Pura Sehore (M.P)"}
      </h2>
      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{ color: resumeInfo?.themeColor }}
        >
          +91 {resumeInfo?.phone ? resumeInfo?.phone : "8815598449"}
        </h2>
        <h2
          className="font-normal text-xs "
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.email ? resumeInfo?.email : "yashwardhanst@gmail.com"}
        </h2>
      </div>
      <hr
        className="borde-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
      <p className="text-xs">
        {" "}
        {resumeInfo?.summery
          ? resumeInfo?.summery
          : "Creative frontend developer with experience building responsive web applications using React, JavaScript, HTML, CSS, and modern UI tools."}
      </p>
    </div>
  );
}
