import {
  AssetType,
  Scene,
  WebGLEngine,
  Loader,
  SystemInfo,
  Platform,
} from "@galacean/engine";
import projectInfo from "../project.json";
import "./scripts";

import { ShaderLab } from "@galacean/engine-shader-lab";
import { Logger } from "@galacean/engine";
import { registerIncludes } from "@galacean/engine-toolkit";
import { registerShaders } from "./shaders";
import VConsole from "vconsole";

const isIOS =
  SystemInfo.platform === Platform.IPhone ||
  SystemInfo.platform === Platform.IPad;

export async function init(canvas: HTMLCanvasElement) {
  const config = {
    canvas,
    physics: null,
    ktx2Loader: { workerCount: isIOS ? 0 : 4 },
    // @ts-ignore
    graphicDeviceOptions: projectInfo.webGLRendererOptions,
  };

  config.shaderLab = new ShaderLab();
  Logger.enable();
  registerIncludes();
  const vConsole = new VConsole({ theme: "dark" });

  // @ts-ignore
  const engine = await WebGLEngine.create(config);

  // @ts-ignore
  engine.canvas.resizeByClientSize(projectInfo.devicePixelRatio);

  registerShaders();

  const result = await engine.resourceManager
    .load({
      url: projectInfo.url,
      type: AssetType.Project,
    })
    .then(() => {
      downloadTestData();
    })
    .catch((e) => {
      throw e;
    });

  engine.run();

  return engine;
}

interface IBenchmark {
  getShaderProgram: number;
  shaderLab2GLSL?: number;
  webglCompileGLSL: number;
  type: "ShaderLab" | "Canonical";
  count: number;
}

interface ICSVDataItem {
  "ShaderLab-All": number;
  "ShaderLab-2-GLSL": number;
  "ShaderLab-GLSL-Compile": number;
  "Canonical-All": number;
  "Canonical-GLSL-Compile": number;
  count: number;
}

function downloadTestData() {
  // @ts-ignore
  const testCase = window.__TEST_DATA as IBenchmark[];

  // @ts-ignore
  if (testCase?.length < 200) {
    setTimeout(downloadTestData, 1000);
    return;
  }

  let csvData = [] as ICSVDataItem[];
  csvData.length = 0;
  for (const benchmark of testCase) {
    const { count, type, getShaderProgram, shaderLab2GLSL, webglCompileGLSL } =
      benchmark;
    const csvItem = csvData[count] ?? ({} as ICSVDataItem);
    csvItem.count = count;
    if (type === "Canonical") {
      csvItem["Canonical-All"] = getShaderProgram;
      csvItem["Canonical-GLSL-Compile"] = webglCompileGLSL;
    } else {
      csvItem["ShaderLab-All"] = getShaderProgram;
      csvItem["ShaderLab-2-GLSL"] = shaderLab2GLSL;
      csvItem["ShaderLab-GLSL-Compile"] = webglCompileGLSL;
    }

    csvData[count] = csvItem;
  }

  csvData = csvData.sort((a, b) => a.count - b.count);
  let csvContent =
    "count, Canonical-All, ShaderLab-All, Canonical-GLSL-Compile, ShaderLab-GLSL-Compile, ShaderLab-2-GLSL\n";
  for (const data of csvData) {
    csvContent += `${data.count}, ${data["Canonical-All"]}, ${data["ShaderLab-All"]}, ${data["Canonical-GLSL-Compile"]}, ${data["ShaderLab-GLSL-Compile"]}, ${data["ShaderLab-2-GLSL"]}\n`;
  }
  console.log(csvContent);

  const buffer = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(buffer);

  var link = document.createElement("a");
  link.download = "data.csv";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
