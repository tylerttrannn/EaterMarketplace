import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { FlipWords } from "./components/ui/flip-words";
import testImage from "./assets/test.png";
import { BentoGrid, BentoGridItem } from "./components/ui/bento-grid";

import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const words = ["clothing", "furniture", "electronic", "textbook"];

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);


const items = [
  {
    title: "Buy and Sell with Confidence",
    description: "Connect with trusted UCI students to buy and sell items securely and easily.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Exclusive for Anteaters",
    description: "Enjoy a marketplace designed specifically for the UCI community.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Simple and Intuitive Design",
    description: "List items in seconds with our easy-to-use interface.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Affordable Deals for Students",
    description: "Find amazing deals on everything from textbooks to furniture.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];



function App() {
  const navigate = useNavigate();

  return (
    <div>
      {/* header*/}
      <div className="sticky top-0 z-50 bg-stone-100 shadow-m mb-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-3 items-center px-4 py-2">
          {/* Logo (Left) */}
          <div className="flex justify-start">
            <h1 className="font-sans text-[14px] font-medium normal-case">ZotMarketplace</h1>
          </div>

          {/* Center Nav Links */}
          <div className="flex justify-center space-x-4 text-[#525252]">
            <h1 className="font-sans text-[14px] font-medium normal-case">Features</h1>
            <h1 className="font-sans text-[14px] font-medium normal-case">Contact</h1>
            <h1 className="font-sans text-[14px] font-medium normal-case">FAQ</h1>
          </div>

          {/* Login (Right) */}
          <div className="flex justify-end">
            <Button onClick={() => navigate('/login')} className="text-[14px] font-medium normal-case">Login</Button>
          </div>
        </div>
      </div>



      <div className="flex-col justify-center items-center px-4 mb-4 bg-[#FFFFFF] pt-16 pb-10">
        <div className="text-7xl text-center text-neutral-600 dark:text-neutral-400 text-[#374151]" style={{ fontWeight: 525 }}>          
          List your 
          <FlipWords className = "px-4 " words={words} /> <br />
          items with ZotMarketplace
        </div>



        {/* mini text section */}
        <div className = "text-1xl text-neutral-500 dark:text-neutral-400 justify-center text-center mt-4 mb-4 text-[#4B5563]">
          <h1> Simplifying the way Anteaters buy and sell items </h1>
        </div>

        <div className = "justify-center text-center mt-4 pb-16"> 
          <Button> Get Started Today</Button>
        </div>

        {/* image*/}
        <div className= "flex justify-center">
          <img src={testImage} alt="Example" className="border-4 w-4/6 rounded-3xl " />
        </div>
      </div>



      <div className="flex-col justify-center items-center px-4 pb-4 bg-[#F4F4F4] ">
        <div className = "flex flex-col justify-center items-center pt-5 pb-5">
          <h1 className = " text-4xl">Made for Anteaters, by Anteaters</h1>
        </div>


        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>

      </div>



      {/* */ }
      <footer className="bg-stone-800 text-neutral-200 py-8 pt-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between flex-wrap">
            {/* Column 1 */}
            <div className="w-full md:w-1/3 mb-4">
              <h3 className="font-semibold text-lg">ZotMarketplace</h3>
              <p className="text-sm mt-2">
                The best place to list your items and find amazing deals!
              </p>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/3 mb-4">
              <h3 className="font-semibold text-lg">Quick Links</h3>
              <ul className="text-sm mt-2">
                <li className="my-1">
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="w-full md:w-1/3 mb-4">
              <h3 className="font-semibold text-lg">Follow Us</h3>
              <ul className="flex mt-2 space-x-4">
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-sm mt-4">
            © {new Date().getFullYear()} ZotMarketplace. All rights reserved.
          </div>
        </div>
      </footer>

    </div>

  );
}

export default App;
