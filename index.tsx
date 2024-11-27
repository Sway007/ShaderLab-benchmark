import { WebGLEngine } from "@galacean/engine";
import React from "react";
import { init } from "./src";
interface IProps {
  /**
   * 场景加载完成
   */
  onLoad?: (engine: WebGLEngine) => void;
  /**
   * 场景加载出错
   */
  onError?: (e: any) => void;
}

function App(props: IProps) {
  React.useEffect(() => {
    init(document.getElementById("canvas") as HTMLCanvasElement)
      .then((engine) => {
        props.onLoad && props.onLoad(engine);
      })
      .catch((e) => {
        props.onError && props.onError(e);
      });
  }, []);

  return (
    <canvas
      id="canvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default App;
