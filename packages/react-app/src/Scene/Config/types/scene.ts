import { Element} from './elements';
import { Nullable } from './shared';

export enum EnvironmentFileType  {
  Hdr = "hdr",
  Image = "image"
}

export type EnvironmentConfig = {
  fileType?: Nullable<EnvironmentFileType>;
  fileUrl?: string;
}

export type SceneConfiguration = {
  elements?: Nullable<Element[]>;
  environment?: Nullable<EnvironmentConfig>;
}