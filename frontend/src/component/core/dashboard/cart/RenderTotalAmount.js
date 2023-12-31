//get the total amount, cart details, token and user from redux store
//display the total amount and a buy now button
//on clicking the buy now button, call the buyCourse function with token, courses array, user as arguments.

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BuyCourse } from "../../../../services/operation/studentFeaturesAPI";
import IconBtn from "../../../common/IconBtn";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    const user_details = user;
    console.log("token: ", token);
    BuyCourse(token, courses, user_details, navigate, dispatch);
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
}
