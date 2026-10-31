import type { Collection } from "@/types/collection";

export type CollectionRecord = Omit<Collection, "banner">;

/** [EDIT] Replace names and copy with your real collections. */
export const collectionRecords: CollectionRecord[] = [
  {
    slug: "sisters-revenge",
    name: "Sisters Revenge",
    tagline: "Drop 04",
    description:
      "The current numbered drop: oversized tee, heavyweight hoodie, cap and stickers, all carrying the Sisters Revenge graphic.",
    dropId: "drop-04",
  },
  {
    slug: "planet-x",
    name: "Planet X",
    tagline: "The ringed-planet series",
    description: "Tees, hoodies and a flight tag built around the Planet X crest.",
    dropId: null,
  },
  {
    slug: "essentials",
    name: "Essentials",
    tagline: "Everyday FINEVERSE",
    description:
      "Core pieces you can wear on repeat: slogan tees, hoodies and caps in staple colours.",
    dropId: null,
  },
  {
    slug: "orbit-zero",
    name: "Orbit Zero",
    tagline: "Drop 03",
    description: "The archive: a past numbered drop, while remaining stock lasts.",
    dropId: "drop-03",
  },
];