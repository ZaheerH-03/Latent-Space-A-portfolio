'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function ParticleSphere({ count = 2000, radius = 2, color = "#60a5fa" }) {
    const points = useRef<THREE.Points>(null)

    // Generate random points in a sphere
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const r = radius * Math.cbrt(Math.random())
            const theta = Math.random() * 2 * Math.PI
            const phi = Math.acos(2 * Math.random() - 1)

            const x = r * Math.sin(phi) * Math.cos(theta)
            const y = r * Math.sin(phi) * Math.sin(theta)
            const z = r * Math.cos(phi)

            positions.set([x, y, z], i * 3)
        }
        return positions
    }, [count, radius])

    useFrame((state) => {
        if (points.current) {
            // Rotation
            points.current.rotation.y = state.clock.getElapsedTime() * 0.05
            points.current.rotation.x = state.clock.getElapsedTime() * 0.02
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color={color}
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default function NeuralCloud({ color = "#60a5fa" }) {
    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <ParticleSphere count={3000} radius={3.5} color={color} />
            <ParticleSphere count={1500} radius={1.5} color={color} />
        </Float>
    )
}
