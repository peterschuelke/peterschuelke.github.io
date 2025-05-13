import { useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface LightSourceProps {
  className?: string
  instanceId: string
}

function Model({ mouseX, mouseY, instanceId }: { mouseX: number, mouseY: number, instanceId: string }) {
  const modelUrl = useMemo(() => `/assets/StageLight.glb?instance=${instanceId}`, [instanceId])
  const gltf = useLoader(GLTFLoader, modelUrl)
  const modelRef = useRef<THREE.Group>()
  const pivotRefs = useRef<{ [key: string]: THREE.Group }>({})
  const debugRefs = useRef<{ [key: string]: THREE.Mesh }>({})

  useEffect(() => {
    return () => {
      if (gltf.scene) {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose()
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose())
              } else {
                child.material.dispose()
              }
            }
          }
        })
      }
    }
  }, [gltf])

  useEffect(() => {
    if (!gltf.scene) return

    console.log('Model structure:')
    gltf.scene.traverse((child) => {
      // Add materials to all meshes
      if (child instanceof THREE.Mesh) {
        if (child.name.toLowerCase().includes('11_1')) {
          // Make 11_1 emissive to appear as a light source
          child.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            emissive: '#ffffff',
            emissiveIntensity: 10,
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1
          })
        } else {
          // Regular material for other parts
          child.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1
          })
        }
      }
      // Only set initial rotation for 11_4
      if (child.name.toLowerCase().includes('11_4')) {
        child.rotation.z = (-Math.PI) / 4 // -45 degrees
      }
    })

    // Create pivot groups for 11_1 and 11_2
    gltf.scene.traverse((child) => {
      if (child.name.toLowerCase().includes('11_1') || child.name.toLowerCase().includes('11_2')) {
        const pivot = new THREE.Group()
        const originalParent = child.parent
        const originalPosition = child.position.clone()

        console.log(`Part ${child.name} original position:`, originalPosition)

        // Set different pivot points for 11_1 and 11_2
        if (child.name.toLowerCase().includes('11_1')) {
          pivot.position.set(0, 2.56, 0) // Adjusted pivot for 11_1
        } else {
          pivot.position.set(0, 3, 0) // Keep original pivot for 11_2
        }

        // Add child to pivot group
        pivot.add(child)
        child.position.sub(pivot.position) // Adjust child position relative to pivot

        // Add pivot to original parent
        originalParent?.add(pivot)

        // Store pivot reference
        pivotRefs.current[child.name] = pivot

        console.log(`Created pivot for ${child.name}:`, {
          pivotPosition: pivot.position,
          childPosition: child.position,
          childWorldPosition: child.getWorldPosition(new THREE.Vector3())
        })
      }
    })
  }, [gltf])

  useFrame(() => {
    if (!modelRef.current) return

    // Lock the model in place, only flipped upside down
    modelRef.current.rotation.x = Math.PI
    modelRef.current.rotation.y = 0
    modelRef.current.rotation.z = 0

    // Find and rotate the specified parts
    modelRef.current.traverse((child) => {
      if (child.name.toLowerCase().includes('11_1') ||
          child.name.toLowerCase().includes('11_2')) {
        // Calculate rotation angles for both X and Y axes
        const rotationAngleZ = Math.PI + (mouseX * Math.PI) / 4 - Math.PI / 4
        const baseRotationAngleX = -(mouseY * Math.PI) / 4 // Base X rotation

        // Apply Z rotation to the mesh
        child.rotation.z = rotationAngleZ

        // Apply X rotation to the pivot group
        const pivot = pivotRefs.current[child.name]
        if (pivot) {
          // Reset pivot rotation before applying new X rotation
          pivot.rotation.set(0, 0, 0)

          // Scale X rotation based on Z angle to prevent spinning
          // When Z is at 90 or 270 degrees, X rotation should be minimal
          const zFactor = Math.abs(Math.cos(rotationAngleZ))
          const scaledRotationX = baseRotationAngleX * zFactor

          pivot.rotation.x = scaledRotationX

          // Update debug sphere position
          const worldPos = new THREE.Vector3()
          pivot.getWorldPosition(worldPos)
          const debugSphere = debugRefs.current[child.name]
          if (debugSphere) {
            debugSphere.position.copy(worldPos)
          }
        }
      } else if (child.name.toLowerCase().includes('11_3')) {
        // Keep 11_3 rotating only on Z axis
        const rotationAngle = Math.PI + (mouseX * Math.PI) / 4 - Math.PI / 4
        child.rotation.z = rotationAngle
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
        position={[0, .65, 0]}
      />
      {/* Fixed reference point in world space */}
      <Sphere
        args={[0.02, 16, 16]}
        position={[0, 0.6, 0]} // Position it near where we want the pivot
      >
        <meshBasicMaterial color="green" />
      </Sphere>
      {/* Debug visualization of pivot points */}
      {Object.entries(pivotRefs.current).map(([name, pivot]) => {
        const worldPos = new THREE.Vector3()
        pivot.getWorldPosition(worldPos)
        return (
          <Sphere
            key={name}
            ref={(ref) => {
              if (ref) debugRefs.current[name] = ref
            }}
            args={[0.02, 16, 16]}
            position={[worldPos.x, worldPos.y, worldPos.z]}
          >
            <meshBasicMaterial color="red" />
          </Sphere>
        )
      })}
    </>
  )
}

const LightSource = ({ className = '', instanceId }: LightSourceProps) => {
  const [mouseX, setMouseX] = useState(1)
  const [mouseY, setMouseY] = useState(0)
  const canvasId = useMemo(() => `canvas-${instanceId}`, [instanceId])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -((event.clientY / window.innerHeight) * 2 - 1)
      setMouseX(x)
      setMouseY(y)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className={`light-source-container ${className}`} style={{ width: '200px', height: '200px' }}>
      <Canvas
        id={canvasId}
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

        <Model mouseX={mouseX} mouseY={mouseY} instanceId={instanceId} />
      </Canvas>
    </div>
  )
}

export default function LightSourceWithKey({ className = '' }: LightSourceProps) {
  const instanceId = useMemo(() => `light-${Math.random()}`, [])
  return <LightSource key={instanceId} instanceId={instanceId} className={className} />
}