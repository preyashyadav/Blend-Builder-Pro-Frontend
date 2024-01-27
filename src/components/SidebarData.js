import React from "react"; 
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Data Explore",
    path: "/data_explore",
    icon: <BsIcons.BsDatabaseDash />,
  },
  {
    title: "Analytics",
    path: "/featureSelection",
    icon: <IoIcons.IoMdAnalytics />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
 
    // subNav: [
    //   {
    //     title: "Service 1",
    //     path: "/services/services1",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Service 2",
    //     path: "/services/services2",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Service 3",
    //     path: "/services/services3",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    // ],
  },
  // {
  //   title: "Predictions",
  //   path: "/predictions",
  //   icon: <VscIcons.VscOutput />,
  // },
];