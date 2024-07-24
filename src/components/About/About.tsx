// react
import { useState } from "react";
// assets
import cartoonNormal from "../../images/cartoon-normal.png";
import cartoonShy from "../../images/cartoon-shy.png";
import cartoonCry from "../../images/cartoon-cry.png";
import qrCode from "../../images/qrcode-line.jpg";
// react icons
import { BsChatFill } from "react-icons/bs";
import { FaLine, FaCheck, FaX } from "react-icons/fa6";
// shadCN
import { Button } from "../ui/button";

type Status = "initial" | "agree" | "disagree";

const About = () => {
  const [status, setStatus] = useState<Status>("initial");
  return (
    <div className="relative w-72 h-72 mx-auto">
      <img
        src={cartoonNormal.src}
        alt="self portrait normal"
        id="self-normal"
        className={`w-full h-full object-cover ${
          status !== "initial" && "hidden"
        }`}
      />
      <img
        src={cartoonShy.src}
        alt="self portrait shy"
        className={`w-full h-full object-cover ${
          status !== "agree" && "hidden"
        }`}
      />
      <img
        src={cartoonCry.src}
        alt="self portrait happy"
        className={`w-full h-full object-cover ${
          status !== "disagree" && "hidden"
        }`}
      />
      <div
        className={`absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 ${
          status !== "disagree" && "hidden"
        }`}
      >
        <BsChatFill size={150} />
        <div className="text-lg absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          <p className="text-center">No worries,</p>
          <p>Have a nice day ~</p>
        </div>
      </div>
      <div className="w-fit flex flex-col items-center mx-auto gap-5">
        <h1 className="text-3xl font-semibold tracking-wider">
          哈囉，我叫<strong className="text-red-500">"蘿蔔🥕"</strong>
        </h1>
        <h2 className="text-3xl font-semibold">
          我<span id="typewriter"></span>
          <span id="cursor">|</span>
        </h2>
        <p className="text-lg text-center" id="introduction">
          我是個宅宅公務員💼，興趣是逛街、吃美食、程式設計、看動畫、打桌球，願意改天喝個咖啡認識一下嗎？
        </p>
        <div
          className="flex flex-col items-center gap-2 mt-2 hidden"
          id="agree-section"
        >
          <div className="flex gap-2 items-center justify-center">
            <FaLine className="text-green-400" size={30} />
            <span className="text-xl font-semibold">Line ID：johngenius</span>
          </div>
          <img src={qrCode.src} alt="line QR code" className="w-52" />
          <p className="text-lg">
            備註：之後覺得不想往來，可以將我
            <strong className="text-red-500">封鎖</strong>😂
          </p>
        </div>
        <div className="grid gap-2 mt-2 hidden" id="disagree-section">
          <div className="flex gap-2 items-center justify-center">
            <span className="text-lg">祝妳幸運、幸福一輩子～</span>
          </div>
        </div>
        <div className="flex gap-7">
          <Button id="agree" className="text-lg">
            <FaCheck />
            <span className="ml-1">OK</span>
            <Button id="disagree" className="text-lg" variant="destructive">
              <FaX />
              <span className="ml-1">No</span>
            </Button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
