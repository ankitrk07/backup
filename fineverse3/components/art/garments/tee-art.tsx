import type { GarmentArtProps } from "../primitives";
import { ShirtArt } from "./shirt-art";

export function TeeArt(props: GarmentArtProps) {
  return <ShirtArt variant="regular" {...props} />;
}