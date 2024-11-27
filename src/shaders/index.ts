import { Shader, ShaderFactory } from "@galacean/engine";
import ShaderChunk0 from "./Internal/Shader/Advanced/Thin/IridescenceFunction.glsl?raw";
import ShaderChunk1 from "./Internal/Shader/Advanced/Thin/IridescencedirectLight.glsl?raw";
import ShaderChunk2 from "./Internal/Shader/Advanced/Thin/IridescenceIndirectLight.glsl?raw";
import ShaderChunk3 from "./Internal/Shader/Advanced/Thin/IridescenceForwardPass.glsl?raw";
import ShaderChunk4 from "./Internal/Shader/DigtalHuman/Eye/EyeForwardPass.glsl?raw";
import ShaderChunk5 from "./Internal/Shader/DigtalHuman/Eye/EyeFunction.glsl?raw";
import ShaderChunk6 from "./Internal/Shader/DigtalHuman/Hair/HairForwardPass.glsl?raw";
import ShaderChunk7 from "./Internal/Shader/DigtalHuman/Hair/HairFunction.glsl?raw";
import ShaderChunk8 from "./Internal/Shader/DigtalHuman/Hair/HairLightDirect.glsl?raw";
import ShaderChunk9 from "./Internal/Shader/DigtalHuman/SSS/SSSForwardPass.glsl?raw";
import ShaderChunk10 from "./Internal/Shader/DigtalHuman/SSS/SSSFunction.glsl?raw";
import ShaderChunk11 from "./Internal/Shader/DigtalHuman/SSS/SSSLightDirect.glsl?raw";
import Shader10 from "./Internal/Shader/Advanced/Thin/Iridescence.gs?raw";
import Shader11 from "./Internal/Shader/DigtalHuman/Eye/Eye.gs?raw";
import Shader12 from "./Internal/Shader/DigtalHuman/Hair/Hair.gs?raw";
import Shader13 from "./Internal/Shader/DigtalHuman/SSS/SSS.gs?raw";
import Shader14 from "./PBRShader.gs?raw";
export function registerShaders() {
  ShaderFactory.registerInclude(
    "Internal/Shader/Advanced/Thin/IridescenceFunction.glsl",
    ShaderChunk0
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/Advanced/Thin/IridescencedirectLight.glsl",
    ShaderChunk1
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/Advanced/Thin/IridescenceIndirectLight.glsl",
    ShaderChunk2
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/Advanced/Thin/IridescenceForwardPass.glsl",
    ShaderChunk3
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/Eye/EyeForwardPass.glsl",
    ShaderChunk4
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/Eye/EyeFunction.glsl",
    ShaderChunk5
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/Hair/HairForwardPass.glsl",
    ShaderChunk6
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/Hair/HairFunction.glsl",
    ShaderChunk7
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/Hair/HairLightDirect.glsl",
    ShaderChunk8
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/SSS/SSSForwardPass.glsl",
    ShaderChunk9
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/SSS/SSSFunction.glsl",
    ShaderChunk10
  );
  ShaderFactory.registerInclude(
    "Internal/Shader/DigtalHuman/SSS/SSSLightDirect.glsl",
    ShaderChunk11
  );
  const shader10 = Shader.create(Shader10);
  shader10._registerPath("/Internal/Shader/Advanced/Thin/Iridescence.gs");
  const shader11 = Shader.create(Shader11);
  shader11._registerPath("/Internal/Shader/DigtalHuman/Eye/Eye.gs");
  const shader12 = Shader.create(Shader12);
  shader12._registerPath("/Internal/Shader/DigtalHuman/Hair/Hair.gs");
  const shader13 = Shader.create(Shader13);
  shader13._registerPath("/Internal/Shader/DigtalHuman/SSS/SSS.gs");
  const shader14 = Shader.create(Shader14);
  shader14._registerPath("/PBRShader.gs");
}
