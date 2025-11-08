import { ToastContainer } from "react-toastify";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <ToastContainer position="top-center" />
    </>
  );
};

export default Providers;
