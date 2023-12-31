import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Small-Light.png";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const FooterLink2 = [
  {
    title: "Subjects",
    links: [
      { title: "Al", link: "/al" },
      { title: "Cloud Computing", link: "/cloud-computing" },
      { title: "Code Foundations", link: "/code-foundations" },
      { title: "Computer Science", link: "/computer-science" },
      { title: "Cybersecurity", link: "/cybersecurity" },
      { title: "Data Analytics", link: "/data-analytics" },
      { title: "Data Science", link: "/data-science" },
      { title: "Data Visualization", link: "/data-visualization" },
    ],
  },
  {
    title: "Languages",
    links: [
      { title: "Bash", link: "/bash" },
      { title: "C++", link: "/c++" },
      { title: "C#", link: "/csharp" },
      { title: "Go", link: "/go" },
      { title: "HTML & CSS", link: "/html-css" },
      { title: "Java", link: "/java" },
      { title: "JavaScript", link: "/javascript" },
      { title: "Kotlin", link: "/kotlin" },
    ],
  },
];

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%]   flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <div className="flex">
                <img src={Logo} alt="" className="w-[35px]" />
                <div className="text-white text-2xl font-semibold ml-2">
                  SkillQuake
                </div>
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Developer's Details
              </h1>
              <h1 className="text-richblack-50 font-semibold text-[14px]">
                <em>~ Uday Biswas</em>
              </h1>
              <div className="flex gap-3 text-lg">
                {/* <a href="#" rel="noopener noreferrer" target="_blank"><BsFilePerson /></a> */}
                <a href="#" rel="noopener noreferrer" target="_blank">
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/udaybiswas944"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/uday-biswas"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <FaGithub />
                </a>
              </div>
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%]   flex flex-wrap flex-row justify-between pl-1 lg:pl-5 sm:gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%]  lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Copyrights reserved @SkillQuake ❤️</div>
          <div className="text-center">Developer: Uday Biswas ❤</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
