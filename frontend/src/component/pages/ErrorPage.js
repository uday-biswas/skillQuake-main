import SOMETHING_WRONG from "../../assets/Images/someth-went-wrong.png";

const Error = () => {
  return (
    <div className="flex h-screen fixed z-10 w-full gap-9 text-white flex-col justify-center items-center flex-wrap bg-richblack-800">
      <img src={SOMETHING_WRONG} />
      <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
    </div>
  );
};
export default Error;
