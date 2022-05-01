export interface Quake {
  id: string;
  code: number;
  time: string;
  earthquake: earthquake;
  issue: issue;
  points?: point[];
  ver?: string;
  'user-agent'?: string;
}

interface earthquake {
  time: string;
  hypocenter?: hypocenter;
  maxScale?: number;
  domesticTsunami?: string;
  foreignTsunami?: string;
}

interface hypocenter {
  depth?: number;
  latitude?: number;
  longitude?: number;
  magnitude?: number;
  name?: string;
}

interface issue {
  description?: string;
  source?: string;
  time: string;
  type: string;
  correct?: string;
}

interface point {
  pref: string;
  addr: string;
  isArea: boolean;
  scale: number;
}
