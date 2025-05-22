"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Mesh } from "three";

export type GlobeConfig = {
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
};

interface WorldProps {
    globeConfig: GlobeConfig;
}

export function Globe({ globeConfig }: WorldProps) {
    const meshRef = useRef<Mesh>(null);
    const defaultProps = {
        globeColor: "#1d072e",
        showAtmosphere: true,
        atmosphereColor: "#ffffff",
        atmosphereAltitude: 0.1,
        emissive: "#000000",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        autoRotate: true,
        autoRotateSpeed: 0.5,
        ...globeConfig,
    };

    useFrame(() => {
        if (meshRef.current && defaultProps.autoRotate) {
            meshRef.current.rotation.y += defaultProps.autoRotateSpeed * 0.001;
        }
    });

    return (
        <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
                color={defaultProps.globeColor}
                attach="material"
                distort={0.3}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
}

export function World(props: WorldProps) {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <Globe {...props} />
        </group>
    );
}