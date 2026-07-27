import * as THREE from 'three'

// One waypoint per section: where the camera sits and what it looks at.
// Sections are scattered along a descending flight path through space.
export type Waypoint = {
  cam: THREE.Vector3
  target: THREE.Vector3
}

export const waypoints: Waypoint[] = [
  { cam: new THREE.Vector3(0, 0, 10), target: new THREE.Vector3(0, 0, 0) }, // Hero
  { cam: new THREE.Vector3(9, -3, -5), target: new THREE.Vector3(14, -4, -14) }, // About
  { cam: new THREE.Vector3(-10, -9, -19), target: new THREE.Vector3(-10, -10, -32) }, // Projects
  { cam: new THREE.Vector3(12, -17, -41), target: new THREE.Vector3(12, -18, -52) }, // Skills
  { cam: new THREE.Vector3(0, -25, -61), target: new THREE.Vector3(0, -26, -72) }, // Contact
]

// World positions where each section's content lives (the camera targets).
export const sectionPos = waypoints.map((w) => w.target)

export const PAGES = waypoints.length
