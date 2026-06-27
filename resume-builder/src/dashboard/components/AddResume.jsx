import { Loader2, PlusSquare } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { createNewResume } from "../../../service/GlobalApi.js";
import { useUser } from "@clerk/react";
import { Navigate, useNavigate } from "react-router-dom";

export default function () {
  const { user } = useUser();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  async function onCreate() {
    try {
      setLoading(true);

      const data = {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      };
      let res = await createNewResume(data);
      if (res) {
        setLoading(false);
        return navigation(`/dashboard/resume/${res.documentId}/edit`);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div>
      <div
        className="p-14 py-24 px-22 border flex justify-center bg-secondary rounded-lg  items-center
      hover:scale-105 transition-all hover:shadow-xs cursor-pointer h-[280px]"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <span>Add title for your new resume</span>
              <Input
                className="mt-2"
                placeholder="Ex: Full Stack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
              />
            </DialogDescription>

            <div className="flex justify-end">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
