// constants/index.ts
import { StudioType } from '../types';
import { foodStudioConfig } from './food';
import { jewelryStudioConfig } from './jewelry';
import { cosmeticsStudioConfig } from './cosmetics';
import { electronicsStudioConfig } from './electronics';
import { fashionStudioConfig } from './fashion';
import { peopleStudioConfig } from './people';

// Export shared constants so other files only need to import from this index file.
export * from './shared';

export const STUDIO_CONFIGS: Record<StudioType, {
    id: StudioType;
    name: string;
    specialty: string;
    presets: any[]; // Using 'any' for presets for simplicity in this aggregated type
    cameras: any[];
    angles: any[];
    depthsOfField: any[];
    lightingStyles: any[];
}> = {
    food: foodStudioConfig,
    jewelry: jewelryStudioConfig,
    cosmetics: cosmeticsStudioConfig,
    electronics: electronicsStudioConfig,
    fashion: fashionStudioConfig,
    people: peopleStudioConfig,
};