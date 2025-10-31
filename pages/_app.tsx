import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    theme={{
      token: {
        fontSize: 16,
        colorPrimary: "#52c41a",
      },
    }}
  >
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
    />
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
