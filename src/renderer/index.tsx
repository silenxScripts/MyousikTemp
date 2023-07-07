import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./stateManager/store";
import { PersistGate } from "redux-persist/integration/react";
import AppContext from "./stateManager/context/appContext";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Choices from "./customPrompts/choices";
import Alert from "./customPrompts/alert";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AppContext>
            <Choices />
            <Alert />
            <App />
          </AppContext>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </>
);

// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
