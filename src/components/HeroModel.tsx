import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PresentationControls, ContactShadows, Environment, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  // Load the custom 3D model (fixed version)
  const { scene, animations } = useGLTF('/mech_drone_fixed.glb') as any;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Automatically play the first animation clip found in the GLB
    if (actions && Object.keys(actions).length > 0) {
      const firstActionKey = Object.keys(actions)[0];
      const action = actions[firstActionKey];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    }
  }, [actions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(time * 1.5) * 0.1 - 1.2;
      group.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-0.2, 0.2]}
      azimuth={[-0.5, 0.5]}
      snap
    >
      <group ref={group} {...props} dispose={null} scale={4.5}>
        <primitive object={scene} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />
      </group>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={20} blur={2.5} far={4.5} resolution={256} frames={1} />
      <Environment preset="city" />
    </PresentationControls>
  );
}

useGLTF.preload('/mech_drone_fixed.glb');
