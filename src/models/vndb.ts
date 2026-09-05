export interface Novel {
  results: {
    id: string;
    title: string;
    length_minutes?: number;
    rating?: number;
    image?: { url: string };
    description?: string;
  }[];
}

export interface Character {
  results: {
    id: string;
    name: string;
    image?: { url: string };
    description?: string;
    height?: number;
    weight?: number;
    bust?: number;
    waist?: number;
    hips?: number;
    cup?: string;
    age?: number;
    sex?: string[];
    vns: { id: string; title: string }[];
    traits: { id: string; name: string }[];
  }[];
}
