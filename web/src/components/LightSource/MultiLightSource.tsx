import { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshTransmissionMaterial } from '@react-three/drei'

interface MultiLightSourceProps {
  className?: string
  lightPositions: Array<[number, number, number]>
  onAnimationComplete?: () => void
}

interface LightModelProps {
  mousePosition: { x: number, y: number }
  positions: Array<[number, number, number]>
  containerRef: React.RefObject<HTMLDivElement>
  onAnimationComplete?: () => void
}

function LightModel({ mousePosition, positions, containerRef, onAnimationComplete }: LightModelProps) {
  const gltf = useLoader(GLTFLoader, '/assets/MultiStageLights.glb')
  const modelRefs = useRef<THREE.Group[]>([])
  const [spotLight, setSpotLight] = useState<THREE.SpotLight | null>(null)
  const [nameMesh, setNameMesh] = useState<THREE.Mesh | null>(null)
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'turningOn' | 'rotating' | 'waiting' | 'following'>('initial')
  const animationStartTime = useRef(Date.now())
  const [hasCursorEntered, setHasCursorEntered] = useState(false)
  const [lightIntensity, setLightIntensity] = useState(0)

  const getLensColor = (lensNumber: number) => {
    const colors = {
      1: '#00ffff', // cyan
      2: '#ff00ff', // magenta
      3: '#bfff00', // lime
      4: '#00ffff',  // cyan
      5: '#ff00ff', // magenta
      6: '#bfff00', // lime
    }
    return colors[lensNumber as keyof typeof colors] || '#ffffff'
  }

  const createSpotLight = (color: string, lensNumber: number) => {
    const newSpotLight = new THREE.SpotLight(color, 0, 10, Math.PI / 6, 0.5, 1)
    newSpotLight.position.set(0, 0, 0)
    newSpotLight.rotation.x = Math.PI / 4
    const target = new THREE.Object3D()
    target.position.set(0, 14, -1)
    newSpotLight.target = target
    return { newSpotLight, target }
  }

  // Add cursor detection
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!hasCursorEntered) {
        setHasCursorEntered(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [hasCursorEntered])

  useEffect(() => {
    if (!gltf.scene) return

    // Initialize refs array
    modelRefs.current = positions.map(() => new THREE.Group())

    // Store initial rotations
    const initialRotations = new Map<string, number>()
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase()
        if (name.includes('lens') || name.includes('head')) {
          initialRotations.set(name, child.rotation.x)
        }
      }
    })

    // Apply materials to all parts and collect lights
    const spotlights: THREE.SpotLight[] = []
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase()
        if (name.includes('lens')) {
          const lensNumber = parseInt(name.match(/\d+/)?.[0] || '0')
          const color = getLensColor(lensNumber)

          child.material = new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: 0, // Start with no emission
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1
          })

          // Add spotlight to all lenses
          if (lensNumber > 0) {
            const { newSpotLight, target } = createSpotLight(color, lensNumber)
            child.add(newSpotLight)
            child.add(target)
            spotlights.push(newSpotLight)
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

    // Find and store all lights
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.PointLight) {
        child.intensity = 0
      } else if (child instanceof THREE.HemisphereLight) {
        child.intensity = 0
      } else if (child instanceof THREE.AmbientLight) {
        child.intensity = 0
      }
    })
  }, [gltf, positions])

  useFrame(() => {
    if (!gltf.scene || !modelRefs.current.length || !containerRef.current) return

    const currentTime = Date.now()
    const elapsedTime = (currentTime - animationStartTime.current) / 1000 // Convert to seconds

    // Animation sequence
    if (animationPhase === 'initial') {
      // Start turning on after 0.3 seconds
      if (elapsedTime > 0.3) {
        animationStartTime.current = Date.now() // Reset timer for turning on phase
        setAnimationPhase('turningOn')
      }
    } else if (animationPhase === 'turningOn') {
      // Turn on all lights over 0.7 seconds
      const intensity = Math.min(1, elapsedTime / 0.7)

      // Update all spotlights
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.SpotLight) {
          child.intensity = intensity * 50
          const parent = child.parent
          if (parent && parent instanceof THREE.Mesh) {
            const material = parent.material as THREE.MeshStandardMaterial
            if (material) {
              material.emissiveIntensity = intensity * 2
            }
          }
        }
      })

      // Start rotation after lights are on
      if (elapsedTime > 0.7) {
        animationStartTime.current = Date.now() // Reset timer for rotation phase
        setAnimationPhase('rotating')
      }
    } else if (animationPhase === 'rotating') {
      // Rotate lights down over 0.7 second
      const rotationProgress = Math.min(1, elapsedTime / 0.7)
      // Start 15 degrees higher (-PI/2 + PI/12) and rotate to PI/2 - PI/18 (10 degrees less)
      const startRotation = -Math.PI/2 + Math.PI/12
      const targetRotation = startRotation + (Math.PI/2 - Math.PI/18) * rotationProgress

      // Fade in ambient lights during rotation
      const intensity = rotationProgress
      setLightIntensity(intensity)

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.PointLight) {
          child.intensity = intensity * 0.6
        } else if (child instanceof THREE.HemisphereLight) {
          child.intensity = intensity * 0.1
        } else if (child instanceof THREE.AmbientLight) {
          child.intensity = intensity * 0.3
        }
      })

      gltf.scene.traverse((child) => {
        const name = child.name.toLowerCase()
        if (name.includes('lens') || name.includes('head')) {
          const currentZRotation = child.rotation.z
          child.rotation.set(targetRotation, 0, currentZRotation)
        }
      })

      // Move to waiting phase after rotation
      if (elapsedTime > 0.7) {
        animationStartTime.current = Date.now() // Reset timer for waiting phase
        setAnimationPhase('waiting')
        onAnimationComplete?.()
      }
    } else if (animationPhase === 'waiting') {
      // Wait for cursor to enter window
      if (hasCursorEntered) {
        setAnimationPhase('following')
      }
    } else if (animationPhase === 'following') {
      // Normal mouse following behavior
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      modelRefs.current.forEach((group, index) => {
        const position = positions[index]
        const lightNumber = index + 1

        gltf.scene.traverse((child) => {
          const name = child.name.toLowerCase()
          if (name.includes(`lens_${lightNumber}`) || name.includes(`head_${lightNumber}`)) {
            const lightScreenX = centerX + (position[0] * rect.width / 2)
            const lightScreenY = centerY - (position[1] * rect.height / 2)

            const dx = lightScreenX - mousePosition.x
            const dy = lightScreenY - mousePosition.y
            let baseAngle = Math.atan2(dy, dx) + Math.PI / 2

            switch (lightNumber) {
              case 1:
                baseAngle += Math.PI / 12 // 15 degrees to the left
                break
              case 2:
                baseAngle += Math.PI / 24 // 7.5 degrees to the left
                break
              case 5:
                baseAngle -= Math.PI / 24 // 7.5 degrees to the right
                break
              case 6:
                baseAngle -= Math.PI / 12 // 15 degrees to the right
                break
              default:
                break
            }

            // Apply rotations while maintaining the current X rotation
            const currentXRotation = child.rotation.x
            child.rotation.set(currentXRotation, 0, baseAngle)

            const screenDy = lightScreenY - mousePosition.y
            const maxScreenDistance = rect.height / 2
            let yPosForXRot = Math.min(1, Math.max(-1, -screenDy / maxScreenDistance))

            const targetXRotation = (yPosForXRot + 1) * (Math.PI / 2)
            child.rotation.x = targetXRotation
          } else if (name.includes(`arms_${lightNumber}`)) {
            const lightScreenX = centerX + (position[0] * rect.width / 2)
            const lightScreenY = centerY - (position[1] * rect.height / 2)

            const dx = lightScreenX - mousePosition.x
            const dy = lightScreenY - mousePosition.y
            let baseAngle = Math.atan2(dy, dx) + Math.PI / 2

            switch (lightNumber) {
              case 1:
                baseAngle += Math.PI / 12
                break
              case 2:
                baseAngle += Math.PI / 24
                break
              case 5:
                baseAngle -= Math.PI / 24
                break
              case 6:
                baseAngle -= Math.PI / 12
                break
              default:
                break
            }

            child.rotation.z = -baseAngle
          }
        })
      })
    }
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
      <ambientLight intensity={lightIntensity * 0.3} />
      <pointLight position={[1.5, 0, 1]} intensity={lightIntensity * 0.6} color="#e0e0e0" />
      <hemisphereLight
        intensity={lightIntensity * 0.1}
        groundColor="#000000"
        color="#ffffff"
      />
    </>
  )
}

const MultiLightSource = ({ className = '', lightPositions, onAnimationComplete }: MultiLightSourceProps) => {
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
        camera={{ position: [1.5, -1.25, 4], fov: 20 }}
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
          target={[1.5, -.25, 0]}
        />
        <LightModel
          mousePosition={mousePosition}
          positions={lightPositions}
          containerRef={containerRef}
          onAnimationComplete={onAnimationComplete}
        />
      </Canvas>
    </div>
  )
}

export default MultiLightSource