import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/feature/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const navigate = useNavigate();

const [createCourse,{data,isLoading,isError,isSuccess}] = useCreateCourseMutation();

 
  const createCourseHandler = async()=>{
    await createCourse({courseTitle,category:courseCategory})
    console.log(courseTitle,courseCategory)
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success("Course created successfully")
      navigate("/admin/course")
    }
    if(isError){
      toast.error("Failed to create course");
      
    }
  },[
    isError,isSuccess
  ])


  return (
    <div>
      <div className="mb-4">
        <h1 className="font-bold">
          Let's add course , and some basic course details for your new course.
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita,
          nemo.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label> Title </Label>
          <Input type="text" value={courseTitle} placeholder="Enter course name" name="title" onChange={(e)=>setCourseTitle(e.target.value)} />
        </div>
        <div>
          <Label> Category </Label>
          <Select onValueChange={(value) => setCourseCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="nextjs">Nextjs</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="fullstack development">
                  Fullstack Developemtn
                </SelectItem>
                <SelectItem value="frontend developemnt">
                  Frontend Development
                </SelectItem>
                <SelectItem value="backend development">
                  Backend Development
                </SelectItem>
                <SelectItem value="mernstack development">
                  Mernstack Development
                </SelectItem>
                <SelectItem value="javascript">Javascript</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button onClick={createCourseHandler} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
