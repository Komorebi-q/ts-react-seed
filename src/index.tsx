import * as React from "react";
import * as ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import "@style/index.scss";

const App = () => (
  <>
    <a>naturali是的</a>
    <p>
      <span>dasdasshideda</span>
    </p>
  </>
);

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    ReactDom.render(
      <AppContainer>
        <App />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}

ReactDom.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("app")
);
