import { useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface LightSourceProps {
  className?: string
  instanceId: string
  position?: [number, number, number]
}

interface ModelProps {
  mouseX: number
  mouseY: number
  yPosForXRot: number
  instanceId: string
  position?: [number, number, number]
}

function Model({ mouseX, mouseY, yPosForXRot, instanceId, position = [0, 0.65, 0] }: ModelProps) {
  const modelUrl = useMemo(() => `/assets/StageLight.glb?instance=${instanceId}`, [instanceId])
  const gltf = useLoader(GLTFLoader, modelUrl)
  const modelRef = useRef<THREE.Group>()

  useEffect(() => {
    if (!gltf.scene) return

    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name.toLowerCase().includes('lens')) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            emissive: '#ffffff',
            emissiveIntensity: 10,
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1
          })
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1
          })
        }
      }
    })
  }, [gltf])

  useFrame(() => {
    if (!modelRef.current) return

    modelRef.current.rotation.x = Math.PI
    modelRef.current.rotation.y = 0
    modelRef.current.rotation.z = 0

    const angle = Math.atan2(mouseY, mouseX)
    const rotationZ = -angle + Math.PI / 2

    modelRef.current.traverse((child) => {
      if (child.name.toLowerCase().includes('lens') ||
          child.name.toLowerCase().includes('head')) {
        child.rotation.z = rotationZ
        child.rotation.x = 0
        child.rotation.y = 0
        const targetXRotation = -yPosForXRot * (Math.PI / 2) + (Math.PI / 2)
        child.rotation.x = targetXRotation
      } else if (child.name.toLowerCase().includes('arms')) {
        child.rotation.z = rotationZ
      }
    })
  })

  if (!gltf.scene) return null

  return (
    <>
      <primitive
        ref={modelRef}
        object={gltf.scene}
        scale={0.09}
        position={position}
      />
      <Sphere
        args={[0.02, 16, 16]}
        position={[position[0], position[1] - 0.05, position[2]]}
      >
        <meshBasicMaterial color="green" />
      </Sphere>
    </>
  )
}

const LightSource = ({ className = '', instanceId, position }: LightSourceProps) => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [yPosForXRot, setYPosForXRot] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<{ x: number, y: number } | null>(null)

  useEffect(() => {
    const updateCenter = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!centerRef.current) return

      const dx = centerRef.current.x - event.clientX
      const dy = centerRef.current.y - event.clientY
      const angleToCenter = Math.atan2(dy, dx)
      setMouseX(Math.cos(angleToCenter))
      setMouseY(Math.sin(angleToCenter))

      const currentYOffset = event.clientY - centerRef.current.y
      const rawYPos = -(currentYOffset / 1200)
      const clampedYPos = Math.max(-1, Math.min(1, rawYPos))
      setYPosForXRot(clampedYPos)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', updateCenter)
    updateCenter()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateCenter)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`light-source-container ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={.2} />
        <pointLight position={[2, 2, 2]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-2, 2, 2]} intensity={0.6} color="#ffffff" />
        <hemisphereLight
          intensity={0.1}
          groundColor="#000000"
          color="#ffffff"
        />
        <Model
          mouseX={mouseX}
          mouseY={mouseY}
          yPosForXRot={yPosForXRot}
          instanceId={instanceId}
          position={position}
        />
      </Canvas>
    </div>
  )
}

export default function LightSourceWithKey({ className = '', position }: LightSourceProps) {
  const instanceId = useMemo(() => `light-${Math.random()}`, [])
  return <LightSource key={instanceId} instanceId={instanceId} className={className} position={position} />
}