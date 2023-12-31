//take the section details, isActive, handleActive as props
//define the ref for the accordion bar and store it in contentEl
//define the active and sectionHeight state

//inside the return statement
//show the section name and the number of lectures in the section
//on clicking the section name, use the contentEl to toggle the sectionHeight
//show the sub sections of the section when the section is active(when the sectionHeight is not 0)
//on clicking the section name, the handleActive function, which includes the section id in the isActive array.
//as isActive is changed, the useEffect sets the active state to true or false, hence, toggling occurs.

import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";

export default function CourseAccordionBar({
  section,
  isActive,
  handleActive,
}) {
  const contentEl = useRef(null);

  // Accordion state
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(isActive?.includes(section._id));
  }, [isActive]);
  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
          onClick={() => {
            handleActive(section._id);
          }}
        >
          <div className="flex items-center gap-2">
            <i
              className={
                isActive.includes(section._id) ? "rotate-180" : "rotate-0"
              }
            >
              <AiOutlineDown />
            </i>
            <p>{section?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-yellow-25">
              {`${section.subSection.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
          {section?.subSection?.map((subSec, i) => {
            return (
              <div className="flex justify-between py-2" key={i}>
                <div className={`flex items-center gap-2`}>
                  <span>
                    <HiOutlineVideoCamera />
                  </span>
                  <p>{subSec?.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
