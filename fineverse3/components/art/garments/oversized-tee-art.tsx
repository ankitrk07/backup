import type { GarmentArtProps } from "../primitives";
import { ShirtArt } from "./shirt-art";

export function OversizedTeeArt(props: GarmentArtProps) {
  return <ShirtArt variant="oversized" {...props} />;
}