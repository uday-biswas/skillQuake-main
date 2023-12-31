//a standard button structure with text and icon
//text - a string that will be displayed as button text
//onclick - a function that will be called when button is clicked
//children - if you want to add any icon inside the button, pass it as children
//disabled - button will be disabled if disabled is true, shows the loading status
//outline - if outline is true, button will have border and text as yellow and bg as dark , else bg will be yellow and text will be dark
//customClasses - any custom classes that you want to add to the button
//type - type of button, default is submit

export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-2 md:px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
