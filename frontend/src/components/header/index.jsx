import Logo from "../../icons/logo.svg";

export const Header = () => {
  return (
    <div className="w-full h-[90px] bg-white flex items-center ml-4">
      <a href="https://www.syyclops.com" target="_self">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
      </a>
    </div>
  );
};
