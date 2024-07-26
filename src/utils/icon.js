import { lazy } from "react";

const GrFireball = lazy(() =>
  import("react-icons/gr").then((module) => ({ default: module.GrFireball }))
);
const AiFillProduct = lazy(() =>
  import("react-icons/ai").then((module) => ({ default: module.AiFillProduct }))
);
const FaBoxOpen = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaBoxOpen }))
);
const IoPeopleCircle = lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoPeopleCircle,
  }))
);
const IoMdCart = lazy(() =>
  import("react-icons/io").then((module) => ({ default: module.IoMdCart }))
);
const RiUserSmileFill = lazy(() =>
  import("react-icons/ri").then((module) => ({
    default: module.RiUserSmileFill,
  }))
);
const MdOutlineFollowTheSigns = lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineFollowTheSigns,
  }))
);
const FaUser = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaUser }))
);
const MdDarkMode = lazy(() =>
  import("react-icons/md").then((module) => ({ default: module.MdDarkMode }))
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
};
