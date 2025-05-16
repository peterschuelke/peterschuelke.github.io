import { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshTransmissionMaterial } from '@react-three/drei'

interface MultiLightSourceProps {
  className?: string
  lightPositions: Array<[number, number, number]>
}

interface LightModelProps {
  mousePosition: { x: number, y: number }
  positions: Array<[number, number, number]>
  containerRef: React.RefObject<HTMLDivElement>
}

function LightModel({ mousePosition, positions, containerRef }: LightModelProps) {
  const gltf = useLoader(GLTFLoader, '/assets/MultiStageLights.glb')
  const modelRefs = useRef<THREE.Group[]>([])
  const [spotLight, setSpotLight] = useState<THREE.SpotLight | null>(null)
  const [nameMesh, setNameMesh] = useState<THREE.Mesh | null>(null)

  const getLensColor = (lensNumber: number) => {
    const colors = {
      1: '#00ffff', // cyan
      2: '#ff00ff', // magenta
      3: '#bfff00', // lime
      4: '#00ffff'  // cyan
    }
    return colors[lensNumber as keyof typeof colors] || '#ffffff'
  }

  const createSpotLight = (color: string, lensNumber: number) => {
    const newSpotLight = new THREE.SpotLight(color, 50, 10, Math.PI / 6, 0.5, 1)
    newSpotLight.position.set(0, 0, 0)
    newSpotLight.rotation.x = Math.PI / 4
    const target = new THREE.Object3D()
    target.position.set(0, 14, -1)
    newSpotLight.target = target
    return { newSpotLight, target }
  }

  useEffect(() => {
    if (!gltf.scene) return

    // Initialize refs array
    modelRefs.current = positions.map(() => new THREE.Group())

    // Apply materials to all parts
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase()
        if (name.includes('lens')) {
          const lensNumber = parseInt(name.match(/\d+/)?.[0] || '0')
          const color = getLensColor(lensNumber)

          child.material = new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: lensNumber > 0 ? 2 : 10,
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1
          })

          // Add spotlight to all lenses
          if (lensNumber > 0) {
            const { newSpotLight, target } = createSpotLight(color, lensNumber)
            child.add(newSpotLight)
            child.add(target)
            if (lensNumber === 2) {
              setSpotLight(newSpotLight)
            }
          }
        } else if (name.includes('name') || name.includes('title')) {
          setNameMesh(child)
        } else if (name.includes('truss') || name.includes('chain')) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#e0e0e0',
            metalness: 0.8,
            roughness: 0.3,
            envMapIntensity: 1.6
          })
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            metalness: 0.9,
            roughness: 0.2,
            envMapIntensity: 1
          })
        }
      }
    })
  }, [gltf, positions])

  useFrame(() => {
    if (!gltf.scene || !modelRefs.current.length || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Update each light instance
    modelRefs.current.forEach((group, index) => {
      const position = positions[index]
      const lightNumber = index + 1

      // Find and rotate the specific parts for this light
      gltf.scene.traverse((child) => {
        const name = child.name.toLowerCase()
        if (name.includes(`lens_${lightNumber}`) || name.includes(`head_${lightNumber}`)) {
          // Calculate screen space position for this light
          const lightScreenX = centerX + (position[0] * rect.width / 2)
          const lightScreenY = centerY - (position[1] * rect.height / 2)

          // Calculate angle in screen space
          const dx = lightScreenX - mousePosition.x
          const dy = lightScreenY - mousePosition.y
          let baseAngle = Math.atan2(dy, dx) + Math.PI / 2

          // Add 10-degree offset for lights 1 and 4
          if (lightNumber === 1) {
            baseAngle += Math.PI / 18 // 10 degrees to the left
          } else if (lightNumber === 4) {
            baseAngle -= Math.PI / 18 // 10 degrees to the right
          }

          // Apply rotations
          child.rotation.z = baseAngle
          child.rotation.x = 0
          child.rotation.y = 0

          // Calculate vertical rotation based on screen space y-difference
          const screenDy = lightScreenY - mousePosition.y
          const maxScreenDistance = rect.height / 2
          let yPosForXRot = Math.min(1, Math.max(-1, -screenDy / maxScreenDistance))

          const targetXRotation = (yPosForXRot + 1) * (Math.PI / 2)
          child.rotation.x = targetXRotation
        } else if (name.includes(`arms_${lightNumber}`)) {
          // Calculate screen space position for this light
          const lightScreenX = centerX + (position[0] * rect.width / 2)
          const lightScreenY = centerY - (position[1] * rect.height / 2)

          // Calculate angle in screen space
          const dx = lightScreenX - mousePosition.x
          const dy = lightScreenY - mousePosition.y
          let baseAngle = Math.atan2(dy, dx) + Math.PI / 2

          // Add 10-degree offset for lights 1 and 4
          if (lightNumber === 1) {
            baseAngle += Math.PI / 18 // 10 degrees to the left
          } else if (lightNumber === 4) {
            baseAngle -= Math.PI / 18 // 10 degrees to the right
          }

          // Apply the same rotation as the lens/head
          child.rotation.z = -baseAngle
        }
      })
    })
  })

  if (!gltf.scene) return null

  return (
    <>
      <group position={[0, 0, 0]}>
        <primitive
          ref={(el) => {
            if (el) modelRefs.current[0] = el
          }}
          object={gltf.scene}
          scale={0.02}
        />
      </group>
      {nameMesh && (
        <mesh
          geometry={nameMesh.geometry}
          position={nameMesh.position}
          rotation={nameMesh.rotation}
        >
          <MeshTransmissionMaterial
            color="#ffffff"
            attenuationColor="#ffffff"
            background={new THREE.Color("#000000")}
            transmissionSampler={true}
            backside={true}
            attenuationDistance={0.5}
            roughness={0.1}
            transmission={0.95}
            ior={1.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  )
}

const MultiLightSource = ({ className = '', lightPositions }: MultiLightSourceProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`multi-light-source-container ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [1.2, -1.25, 4], fov: 20 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
          target={[1.2, -.25, 0]}
        />
        <ambientLight intensity={.3} />
        <pointLight position={[1.2, 0, 1]} intensity={0.6} color="#e0e0e0" />
        <hemisphereLight
          intensity={0.1}
          groundColor="#000000"
          color="#ffffff"
        />
        <LightModel
          mousePosition={mousePosition}
          positions={lightPositions}
          containerRef={containerRef}
        />
      </Canvas>
    </div>
  )
}

export default MultiLightSource