import React from "react";
import { MainProvider } from './src/contexts/mainProvider'
import Main from "./src/Main";

function App(): JSX.Element {
  return (
    <MainProvider>
      <Main />
    </MainProvider>
  );
}

export default App;