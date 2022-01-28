import Login from "../scene/Login/Login";
import Dashboard from "../scene/Dashboard/Dashboard";
import UserProfile from "../scene/UserProfile/UserProfile";
import Leave from "../scene/Leave/Leave";
import UserList from "../scene/UserList/UserList";
import Holidays from "../scene/Holidays/Holidays";

// HOC
import Auth from "../hoc/Auth";
import { ModalContainer } from "../shared/Modal/ModalContainer";
import ApplyLeave from "../shared/Modal/ApplyLeave";
import UpdateLeave from "../shared/Modal/UpdateLeave";

const AddLeaveModal = () => {
  return (
    <ModalContainer>
      <ApplyLeave />
    </ModalContainer>
  );
};
const UpdateLeaveModal = () => {
  return (
    <ModalContainer>
      <UpdateLeave />
    </ModalContainer>
  );
};

const routes = [
  {
    name: "Login",
    path: "/",
    component: Login,
    hoc: Auth,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    hoc: Auth,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    hoc: Auth,
  },
  {
    name: "UserList",
    path: "/users",
    component: UserList,
    hoc: Auth,
  },
  {
    name: "User Profile",
    path: "/user-profile",
    component: UserProfile,
    hoc: Auth,
  },
  {
    name: "User Profile",
    path: "/user-profile/:id",
    component: UserProfile,
    hoc: Auth,
  },
  {
    name: "Leave",
    path: "/leave",
    component: Leave,
    hoc: Auth,
  },
  {
    name: "Holidays",
    path: "/holidays",
    component: Holidays,
    hoc: Auth,
  },
  {
    name: "Edit",
    path: "/leave/edit",
    component: UpdateLeaveModal,
    hoc: Auth,
  },
  {
    name: "Add",
    path: "/leave/add",
    component: AddLeaveModal,
    hoc: Auth,
  },
];
export default routes;
