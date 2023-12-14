import Sidebar from "../components/sidebar";
import RoomChat from "../components/RoomChat";

function Dashboard() {
  return (
    <div className="container flex h-screen justify-center py-10">
      <Sidebar />
      <RoomChat />
    </div>
  );
}

export default Dashboard;
