//get the step from redux store.
//create a steps array with the titles and ids.
//map through the steps array and show the step number in a button.
//if step is 1, render the CourseInformationForm component.
//if step is 2, render the CourseBuilderForm component.
//if step is 3, render the PublishCourse component.

import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./course Builder/CourseBuilderForm";
import CourseInformationForm from "./Course Information/CourseInformationForm";
import PublishCourse from "./Publish Course/index";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div>
      <div className="relative mb-2 flex w-full md:justify-center">
        {steps.map((item) => (
          <>
            <div className="flex flex-col md:items-center " key={item.id}>
              <button
                className={`grid cursor-default aspect-square w-5 md:w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id //if step is equal to item.id, highlight the button.
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? ( //if step is greater than item.id, show the check icon.
                  <FaCheck className="md:font-bold font-medium text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && ( //if item.id is not equal to steps.length, show a dashed line after the button.
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none md:justify-between">
        {steps.map((item) => (
          <div
            className="flex w-24 md:min-w-[130px] flex-col items-center :gap-y-2"
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {" "}
              {/*show the item title under the button*/}
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
}
