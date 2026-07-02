import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { UpdateResumeDetail } from "../../../../../service/GlobalApi";
import { toast } from "sonner";

export default function PersonalDetail({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isloading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({});
  const params = useParams();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevInfo) => ({ ...prevInfo, [name]: value }));
    setResumeInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  async function onSave(e) {
    try {
      setIsloading(true);
      e.preventDefault();
      const { resumeId } = params;

      const data = formData;
      let res = await UpdateResumeDetail(resumeId, data);
      if (res) {
        enableNext(false);
        setIsloading(false);
        toast("Detail Updated.");
      }
    } catch (err) {
      console.log(err);
      enableNext(true);
      setIsloading(false);
    }
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4  mt-4">
      <h2 className="font-bold text-lg">Personal detail</h2>
      <p className="">Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm" htmlFor="">
              First Name
            </label>
            <Input
              name="firstName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="">
              Last Name
            </label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm " htmlFor="">
              Job Title
            </label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm " htmlFor="">
              Address
            </label>
            <Input
              name="address"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.address}
            />
          </div>{" "}
          <div>
            <label className="text-sm" htmlFor="">
              Phone
            </label>
            <Input
              name="phone"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="">
              Email
            </label>
            <Input
              name="email"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={isloading}>
            {isloading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
