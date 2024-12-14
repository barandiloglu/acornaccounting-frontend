import AdminAuth from "../../../components/AdminAuth";

const AppointmentsPage = () => {
  return (
    <AdminAuth>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p>This is the appointments page for admins only.</p>
      </div>
    </AdminAuth>
  );
};

export default AppointmentsPage;
