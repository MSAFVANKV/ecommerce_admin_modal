"use client";
import { useModal } from "@/providers/context/context";
import {  useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TaskbarProps = {
  id: number;
  title: string;
  path?: string;
};

const TaskbarItems: TaskbarProps[] = [
  { id: 1, title: "General", path: "general" },
  { id: 2, title: "Files & Media", path: "files-media" },
  { id: 3, title: "Price & Stock", path: "price-stock" },
  { id: 4, title: "Shipping", path: "shipping" },
];

export default function AdminProductTaskbar() {
  const location = useLocation(); // Access current URL
  const navigate = useNavigate(); // For navigation
  const { selectedPage, setSelectedPage } = useModal();

  // Sync selected page with URL query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentPath = params.get("q");
    if (currentPath) {
      setSelectedPage(currentPath); // Update local state
    }
  }, [location.search, setSelectedPage]);

  const handleTaskbar = (path: string) => {
    const params = new URLSearchParams(location.search);
    params.set("q", path);
    navigate(`?${params.toString()}`); // Update URL

    setSelectedPage(path); // Update local state
  };

  return (
    <div className="h-full rounded-lg bg-white w-full">
      <div className="px-4 py-5">
        <h3 className="font-bold">Add New Product</h3>
      </div>
      <ul className="w-full flex flex-row lg:justify-between lg:items-start justify-center items-center lg:flex-nowrap flex-wrap">
        {TaskbarItems.map((item, index) => (
          <li
            key={item.id}
            className={`${
              selectedPage === item.path
                ? "backdrop-blur-lg  bg-bgGraySoft hover:bg-none text-textMain border-t border-l border border-textHardSoft font-bold"
                : "hover:bg-black/5 border-b border-t border-l border"
            }relative  ${
              index + 1 === TaskbarItems.length && "border-r"
            }   p-3  cursor-pointer backdrop-blur-lg lg:w-full duration-300 transition-all text-center`}
            onClick={() => handleTaskbar(item.path ?? "")}
          >
            {item.title}
            {
              <span
                className={`absolute ${
                  selectedPage === item.path ? "w-full " : "w-0"
                } duration-300 transition-all h-[2px] -bottom-[1px] bg-bg left-0 right-0`}
              ></span>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
