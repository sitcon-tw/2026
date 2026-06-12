import * as THREE from "three";

export const HERO_RANDOM_SEED = 20260328;
export const goldenAngle = Math.PI * (3 - Math.sqrt(5));

export interface VortexConfig {
	centerX: number;
	centerZ: number;
	bottomY: number;
	height: number;
	baseRadius: number;
	topRadius: number;
	turns: number;
}

export type HeroObjectRole = "orb" | "facet" | "ring" | "decor";

const roleVisualScale: Record<HeroObjectRole, number> = {
	orb: 0.82,
	facet: 1,
	ring: 0.92,
	decor: 1.08
};

export const createSeededRandom = (seed = HERO_RANDOM_SEED) => {
	let randomSeed = seed;
	return () => {
		randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0;
		return randomSeed / 4294967296;
	};
};

export const createVortexConfig = (narrowViewport: boolean): VortexConfig => ({
	centerX: narrowViewport ? 28 : 30,
	centerZ: narrowViewport ? -76 : -74,
	bottomY: narrowViewport ? -34 : -40,
	height: narrowViewport ? 90 : 98,
	baseRadius: narrowViewport ? 10 : 16,
	topRadius: narrowViewport ? 26 : 46,
	turns: narrowViewport ? 1.54 : 1.82
});

export const getVortexPosition = (config: VortexConfig, narrowViewport: boolean, level: number, thetaOffset = 0, radiusBias = 1, yOffset = 0, time = 0, target = new THREE.Vector3()) => {
	const normalizedLevel = THREE.MathUtils.euclideanModulo(level, 1);
	const centerSway = Math.sin(normalizedLevel * Math.PI * 2.4 + time * 0.42) * (narrowViewport ? 2.4 : 4.5);
	const radiusEase = Math.pow(normalizedLevel, 0.72);
	const radius = THREE.MathUtils.lerp(config.baseRadius, config.topRadius, radiusEase) * radiusBias;
	const angle = normalizedLevel * Math.PI * 2 * config.turns + thetaOffset + time;

	return target.set(config.centerX + centerSway + radius * Math.cos(angle), config.bottomY + normalizedLevel * config.height + yOffset, config.centerZ + radius * Math.sin(angle) * 0.68);
};

export const getDepthOpacity = (config: VortexConfig, z: number) => {
	const nearFade = THREE.MathUtils.clamp((z - (config.centerZ - config.topRadius * 0.85)) / (config.topRadius * 1.35), 0.32, 1);
	const frontFade = THREE.MathUtils.clamp((config.centerZ + config.topRadius * 0.88 - z) / (config.topRadius * 0.9), 0.58, 1);
	return nearFade * frontFade;
};

export const getHeroObjectScale = (role: HeroObjectRole, narrowViewport: boolean, level: number, random: () => number) => {
	const [minScale, maxScale] = narrowViewport ? [0.52, 1.08] : [0.72, 1.58];
	const middleBoost = 1 + Math.sin(level * Math.PI) * 0.06;
	return THREE.MathUtils.lerp(minScale, maxScale, random()) * roleVisualScale[role] * middleBoost;
};
