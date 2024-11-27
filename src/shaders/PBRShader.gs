Shader "/PBRShader.gs" {
    Editor {
      Properties{
        Header("Base"){
          material_IOR("IOR", Range(0, 5, 0.01)) = 1.5;
          material_BaseColor("BaseColor", Color) = (1, 1, 1, 1);
          material_BaseTexture("BaseTexture", Texture2D);
        }

        Header("Metal Roughness") {
          material_Metal( "Metal", Range(0,1,0.01) ) = 1;
          material_Roughness( "Roughness", Range( 0, 1, 0.01 ) ) = 1;
          material_RoughnessMetallicTexture("RoughnessMetallicTexture", Texture2D);
        }

        Header("Anisotropy") {
          anisotropyIntensity("Intensity", Range(0, 1, 0.01)) = 0;
          anisotropyRotation("Rotation", Range(0, 360, 1)) = 0;
          material_AnisotropyTexture("Texture", Texture2D);
        }

        Header("Normal") {
          material_NormalTexture("NormalTexture", Texture2D);
          material_NormalIntensity("NormalIntensity", Range(0, 5, 0.01)) = 1;
        }

        Header("Emissive") {
          material_EmissiveColor("EmissiveColor", Color ) = (0, 0, 0, 1);
          material_EmissiveTexture("EmissiveTexture", Texture2D);
        }

        Header("Occlusion") {
          material_OcclusionTexture("OcclusionTexture", Texture2D);
          material_OcclusionIntensity("OcclusionIntensity", Range(0, 5, 0.01)) = 1;
          material_OcclusionTextureCoord("OcclusionTextureCoord", Float) = 0;
        }

        Header("Clear Coat") {
          material_ClearCoat("ClearCoat", Range(0, 1, 0.01)) = 0;
          material_ClearCoatTexture("ClearCoatTexture", Texture2D);
          material_ClearCoatRoughness("ClearCoatRoughness", Range(0, 1, 0.01)) = 0;
          material_ClearCoatRoughnessTexture("ClearCoatRoughnessTexture", Texture2D);
          material_ClearCoatNormalTexture("ClearCoatNormalTexture", Texture2D);
        }

        Header("Common") {
          isTransparent("Transparent", Boolean) = false;
          renderFace("Render Face", Int) = 0;
          blendMode("Blend Mode", Int) = 0;
          material_AlphaCutoff( "AlphaCutoff", Range(0, 1, 0.01) ) = 0;
          material_TilingOffset("TilingOffset", Vector4) = (1, 1, 0, 0);
        }
      }
      
      UIScript "/PBRScript.ts";
    }

    SubShader "Default" {
      UsePass "pbr/Default/ShadowCaster"

      Pass "Forward Pass" {
        Tags { pipelineStage = "Forward"} 

        DepthState {
          WriteEnabled = depthWriteEnabled;
        }

        BlendState {
          Enabled = blendEnabled;
          SourceColorBlendFactor = sourceColorBlendFactor;
          DestinationColorBlendFactor = destinationColorBlendFactor;
          SourceAlphaBlendFactor = sourceAlphaBlendFactor;
          DestinationAlphaBlendFactor = destinationAlphaBlendFactor;
        }

        RasterState{
          CullMode = rasterStateCullMode;
        }

        RenderQueueType = renderQueueType;

        #define IS_METALLIC_WORKFLOW

        VertexShader = PBRVertex;
        FragmentShader = PBRFragment;

        #include "ForwardPassPBR.glsl"
      }
    }
}
