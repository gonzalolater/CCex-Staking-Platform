import Header from "../component/Header";
import { Outlet } from "react-router-dom";

function Layout(props) {
  const { client } = props;

  return (
    <div>
      <Header client={client} />
      <Outlet />
    </div>
  );
}

export default Layout;
