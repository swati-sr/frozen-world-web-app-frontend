import React from "react"; 

const GrFireball = React.lazy(() =>
  import("react-icons/gr").then((module) => ({ default: module.GrFireball }))
);
const AiFillProduct = React.lazy(() =>
  import("react-icons/ai").then((module) => ({ default: module.AiFillProduct }))
);
const FaBoxOpen = React.lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaBoxOpen }))
);
const IoPeopleCircle = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoPeopleCircle,
  }))
);
const IoMdCart = React.lazy(() =>
  import("react-icons/io").then((module) => ({ default: module.IoMdCart }))
);
const RiUserSmileFill = React.lazy(() =>
  import("react-icons/ri").then((module) => ({
    default: module.RiUserSmileFill,
  }))
);
const MdOutlineFollowTheSigns = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineFollowTheSigns,
  }))
);
const FaUser = React.lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaUser }))
);
const MdDarkMode = React.lazy(() =>
  import("react-icons/md").then((module) => ({ default: module.MdDarkMode }))
);

const IoIosSearch = React.lazy(() =>
  import("react-icons/io").then((module) => ({ default: module.IoIosSearch }))
);

const HiTrendingUp = React.lazy(() =>
  import("react-icons/io").then((module) => ({ default: module.HiTrendingUp }))
);

export {
  GrFireball,
  AiFillProduct,
  FaBoxOpen,
  IoPeopleCircle,
  IoMdCart,
  RiUserSmileFill,
  MdOutlineFollowTheSigns,
  FaUser,
  MdDarkMode,
  IoIosSearch,
  HiTrendingUp
};
