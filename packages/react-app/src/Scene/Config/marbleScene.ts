import { ElementType } from "./types/elements";
import { EnvironmentFileType, SceneConfiguration } from "./types/scene";

const marbleScene: SceneConfiguration = {
  environment: {
    fileType: EnvironmentFileType.Image,
    fileUrl: 'https://firebasestorage.googleapis.com/v0/b/mintxr-experiment.appspot.com/o/kloppenheim_02_1k.pic?alt=media&token=42249658-2916-496b-84ab-f66481b46668'
    // fileUrl: 'https://firebasestorage.googleapis.com/v0/b/mintxr-experiment.appspot.com/o/kloppenheim_02.jpeg?alt=media&token=b2398dc8-965b-411f-b3c3-d58f539b85ab'
  },
  elements: [{
    elementType: ElementType.Model,
    modelConfig: {
      fileUrl: 'https://firebasestorage.googleapis.com/v0/b/mintxr-experiment.appspot.com/o/MarbleTheater-Metallic.glb?alt=media&token=137e6259-00c5-46e3-8a0b-fbe1398b98c1'
    }
  }]
}

export default marbleScene;
