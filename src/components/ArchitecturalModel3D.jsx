import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCcw, Eye, Sun, Moon, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function ArchitecturalModel3D({ onShowNotice }) {
  const mountRef = useRef(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [lightingMode, setLightingMode] = useState('sunset'); // 'night' | 'sunset' | 'day'
  const [activeFloor, setActiveFloor] = useState('penthouse');
  const [autoRotate, setAutoRotate] = useState(true);

  // References to three.js objects for real-time manipulation
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialsRef = useRef([]);
  const towerGroupRef = useRef(null);
  const lightsRef = useRef({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(22, 26, 28);
    camera.lookAt(0, 10, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff1d6, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc9a84c, 2.5);
    dirLight1.position.set(20, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7590c8, 1.2);
    dirLight2.position.set(-25, 20, -20);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xe4c97b, 3, 50);
    pointLight.position.set(0, 28, 0);
    scene.add(pointLight);

    lightsRef.current = { ambientLight, dirLight1, dirLight2, pointLight };

    // 5. Build Dubai Luxury Tower 3D Geometry
    const towerGroup = new THREE.Group();
    towerGroupRef.current = towerGroup;
    scene.add(towerGroup);

    materialsRef.current = [];

    // Materials
    const goldFrameMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false
    });
    materialsRef.current.push(goldFrameMat);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111c2e,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9
    });
    materialsRef.current.push(glassMat);

    const illuminatedGlassMat = new THREE.MeshStandardMaterial({
      color: 0x1a2638,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.2,
      roughness: 0.3
    });
    materialsRef.current.push(illuminatedGlassMat);

    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x090c14,
      metalness: 0.6,
      roughness: 0.4
    });
    materialsRef.current.push(obsidianMat);

    // ── Tier 1: Podium & Commercial Levels (L01 - L12)
    const podiumGeo = new THREE.BoxGeometry(10, 5, 10);
    const podiumMesh = new THREE.Mesh(podiumGeo, obsidianMat);
    podiumMesh.position.y = 2.5;
    towerGroup.add(podiumMesh);

    // Podium Glass Grid
    const podiumGlassGeo = new THREE.BoxGeometry(9.8, 4.6, 9.8);
    const podiumGlass = new THREE.Mesh(podiumGlassGeo, glassMat);
    podiumGlass.position.y = 2.5;
    towerGroup.add(podiumGlass);

    // ── Tier 2: Mid-Rise Executive Residences (L13 - L30)
    const midGeo = new THREE.CylinderGeometry(3.8, 4.5, 9, 8);
    const midMesh = new THREE.Mesh(midGeo, glassMat);
    midMesh.position.y = 9.5;
    towerGroup.add(midMesh);

    // Gold Ribs on Mid-Rise
    for (let r = 0; r < 8; r++) {
      const angle = (r / 8) * Math.PI * 2;
      const ribGeo = new THREE.CylinderGeometry(0.08, 0.08, 9, 6);
      const ribMesh = new THREE.Mesh(ribGeo, goldFrameMat);
      ribMesh.position.set(Math.cos(angle) * 4.1, 9.5, Math.sin(angle) * 4.1);
      towerGroup.add(ribMesh);
    }

    // ── Cantilevered Sky Lounge & Infinity Pool Deck (L31)
    const skyLoungeGeo = new THREE.BoxGeometry(9.5, 0.6, 7.5);
    const skyLoungeMesh = new THREE.Mesh(skyLoungeGeo, goldFrameMat);
    skyLoungeMesh.position.set(0, 14.3, 0);
    towerGroup.add(skyLoungeMesh);

    const poolWaterGeo = new THREE.BoxGeometry(8.8, 0.2, 3.2);
    const poolWaterMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x005577,
      emissiveIntensity: 0.6,
      roughness: 0.1
    });
    materialsRef.current.push(poolWaterMat);
    const poolMesh = new THREE.Mesh(poolWaterGeo, poolWaterMat);
    poolMesh.position.set(0, 14.7, 1.8);
    towerGroup.add(poolMesh);

    // ── Tier 3: High-Rise Skyline Suites (L32 - L48)
    const upperGeo = new THREE.CylinderGeometry(3.0, 3.6, 8, 8);
    const upperMesh = new THREE.Mesh(upperGeo, illuminatedGlassMat);
    upperMesh.position.y = 18.6;
    towerGroup.add(upperMesh);

    // Floor Slabs Lines
    for (let f = 0; f < 8; f++) {
      const slabGeo = new THREE.TorusGeometry(3.3 - f * 0.04, 0.06, 4, 16);
      slabGeo.rotateX(Math.PI / 2);
      const slabMesh = new THREE.Mesh(slabGeo, goldFrameMat);
      slabMesh.position.y = 15.0 + f * 1.0;
      towerGroup.add(slabMesh);
    }

    // ── Tier 4: The Royal Crown Sky Penthouse (L49 - L54)
    const crownGeo = new THREE.ConeGeometry(2.8, 5, 8);
    const crownMesh = new THREE.Mesh(crownGeo, glassMat);
    crownMesh.position.y = 25.1;
    towerGroup.add(crownMesh);

    // Architectural Spire
    const spireGeo = new THREE.CylinderGeometry(0.06, 0.35, 7, 8);
    const spireMesh = new THREE.Mesh(spireGeo, goldFrameMat);
    spireMesh.position.y = 29.5;
    towerGroup.add(spireMesh);

    // Spire Beacon Light
    const beaconGeo = new THREE.SphereGeometry(0.3, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffe28a });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 33.0;
    towerGroup.add(beaconMesh);

    // ── Ground Plane & Architectural Reflective Plaza
    const groundGeo = new THREE.CylinderGeometry(14, 14, 0.4, 32);
    const groundMesh = new THREE.Mesh(groundGeo, obsidianMat);
    groundMesh.position.y = -0.2;
    towerGroup.add(groundMesh);

    const ringGeo = new THREE.RingGeometry(11, 13.8, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.05;
    towerGroup.add(ringMesh);

    // ── Atmospheric Particles / Ambient Lights
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 35;
      particlePositions[p + 1] = Math.random() * 34;
      particlePositions[p + 2] = (Math.random() - 0.5) * 35;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.25,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Interactive Mouse Drag to Rotate
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 7. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Ambient auto-rotation
      if (autoRotate && !isDragging) {
        targetRotationY += 0.003;
      }

      // Smooth damping
      towerGroup.rotation.y += (targetRotationY - towerGroup.rotation.y) * 0.08;
      towerGroup.rotation.x += (targetRotationX - towerGroup.rotation.x) * 0.08;

      // Pulse beacon light
      beaconMat.color.setHex(Math.sin(elapsed * 3) > 0 ? 0xffdf78 : 0xaa8833);

      // Particle floating
      particleSystem.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      domElement.removeEventListener('mousedown', onMouseDown);
      domElement.removeEventListener('touchstart', onTouchStart);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [autoRotate]);

  // Wireframe toggle
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      if (mat) mat.wireframe = wireframeMode;
    });
  }, [wireframeMode]);

  // Lighting Mode toggle
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights.ambientLight) return;

    if (lightingMode === 'night') {
      lights.ambientLight.color.setHex(0x18243c);
      lights.ambientLight.intensity = 0.6;
      lights.dirLight1.color.setHex(0xc9a84c);
      lights.dirLight1.intensity = 1.4;
      lights.dirLight2.color.setHex(0x324f7e);
      lights.pointLight.intensity = 3.5;
    } else if (lightingMode === 'day') {
      lights.ambientLight.color.setHex(0xffffff);
      lights.ambientLight.intensity = 1.4;
      lights.dirLight1.color.setHex(0xfff7e6);
      lights.dirLight1.intensity = 2.2;
      lights.dirLight2.color.setHex(0xd4e2ff);
      lights.pointLight.intensity = 1.0;
    } else {
      // Sunset (default luxury)
      lights.ambientLight.color.setHex(0xfff1d6);
      lights.ambientLight.intensity = 0.9;
      lights.dirLight1.color.setHex(0xe8974d);
      lights.dirLight1.intensity = 2.8;
      lights.dirLight2.color.setHex(0x7590c8);
      lights.pointLight.intensity = 2.5;
    }
  }, [lightingMode]);

  const floorData = {
    penthouse: {
      title: 'L50 – L54: Royal Crown Penthouse & Helipad',
      area: '8,400 sq. ft. &middot; Full 360° Gulf & Burj Khalifa Panorama',
      price: 'AED 48,000,000',
      status: 'Reserved for VIP Allocation',
      features: ['Private cantilevered infinity pool', 'Dedicated express elevator', 'Bulletproof acoustic glazing', 'Private air-taxi / helipad access']
    },
    skyline: {
      title: 'L32 – L48: Sky Villa Residences',
      area: '3,800 – 5,200 sq. ft. &middot; 4 & 5 Bedroom Duplexes',
      price: 'From AED 18,500,000',
      status: '3 Units Remaining',
      features: ['Double-height ceilings (6.2m)', 'Italian Calacatta marble kitchens', 'Wrap-around sunset terraces', '10-Year Golden Visa included']
    },
    terrace: {
      title: 'L31: Suspended Sky Lounge & Infinity Club',
      area: 'Resident-Only Podium & Michelin Wellness Club',
      price: 'Private Facility Included',
      status: 'Exclusive Resident Amenity',
      features: ['Olympic infinity pool over Dubai skyline', 'Cryotherapy & thermal wellness spa', 'Private boardroom & sommelier cellar']
    },
    podium: {
      title: 'L01 – L30: Waterfront Suites & Commercial Grade-A',
      area: '1,450 – 2,800 sq. ft. &middot; 1, 2 & 3 Bedroom Suites',
      price: 'From AED 3,200,000',
      status: 'High Rental Yield Tier (8.2% Net)',
      features: ['Direct DIFC Gate access', 'Turnkey European designer furniture', 'Automated concierge valet', '24/7 biometric security']
    }
  };

  const currentFloor = floorData[activeFloor] || floorData.penthouse;

  return (
    <section className="section-padding model-3d-section" id="3d-model">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Interactive Spatial Engineering</span>
            <h2 className="section-title">Nova Crown Tower <em>3D Architectural Model</em></h2>
            <p className="section-desc">
              Explore Dubai's newest DIFC architectural landmark in real-time 3D. Rotate 360°, inspect structural levels, and toggle architectural blueprint schematics.
            </p>
          </div>

          <div className="model-3d-controls-top">
            <button
              type="button"
              className={`model-ctrl-pill ${autoRotate ? 'active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
              title="Toggle Auto Rotation"
            >
              <RotateCcw size={13} className={autoRotate ? 'spinning-icon' : ''} />
              <span>{autoRotate ? 'Auto-Orbit: ON' : 'Auto-Orbit: OFF'}</span>
            </button>

            <button
              type="button"
              className={`model-ctrl-pill ${wireframeMode ? 'active' : ''}`}
              onClick={() => setWireframeMode(!wireframeMode)}
              title="Toggle Blueprint Wireframe"
            >
              <Layers size={13} />
              <span>{wireframeMode ? 'Solid Mode' : 'CAD Wireframe'}</span>
            </button>
          </div>
        </div>

        {/* 3D Visualizer Canvas & Dashboard Grid */}
        <div className="model-3d-layout">
          {/* Canvas Container */}
          <div className="model-canvas-card">
            <div ref={mountRef} className="webgl-canvas-mount"></div>

            {/* In-Canvas Ambient Badges */}
            <div className="canvas-overlay-badges">
              <span className="cad-badge font-mono">
                <Compass size={11} className="inline-icon" />
                DIFC CO-ORDINATES: 25.2048° N, 55.2708° E
              </span>
              <span className="cad-badge font-mono hide-mobile">
                DRAG WITH MOUSE / TOUCH TO ROTATE 360°
              </span>
            </div>

            {/* Lighting Mode Selector within Canvas */}
            <div className="canvas-lighting-bar">
              <span className="lighting-label hide-mobile">Lighting:</span>
              <button
                type="button"
                className={`light-btn ${lightingMode === 'sunset' ? 'active' : ''}`}
                onClick={() => setLightingMode('sunset')}
                title="Golden Hour Sunset"
              >
                <Sun size={13} />
                <span>Golden Hour</span>
              </button>
              <button
                type="button"
                className={`light-btn ${lightingMode === 'night' ? 'active' : ''}`}
                onClick={() => setLightingMode('night')}
                title="DIFC Night Skyline"
              >
                <Moon size={13} />
                <span>Night Glow</span>
              </button>
              <button
                type="button"
                className={`light-btn ${lightingMode === 'day' ? 'active' : ''}`}
                onClick={() => setLightingMode('day')}
                title="Daylight Clarity"
              >
                <Sparkles size={13} />
                <span>Daylight</span>
              </button>
            </div>
          </div>

          {/* Level Inspector & Specification Drawer */}
          <div className="model-inspector-card">
            <div className="inspector-header">
              <div className="inspector-eyebrow">Level &amp; Allocation Inspector</div>
              <h3 className="inspector-title">Select Architectural Tier</h3>
            </div>

            {/* Level Selector Tabs */}
            <div className="floor-selector-list" role="tablist">
              <button
                type="button"
                className={`floor-select-btn ${activeFloor === 'penthouse' ? 'active' : ''}`}
                onClick={() => setActiveFloor('penthouse')}
              >
                <div className="floor-btn-num">L50-54</div>
                <div className="floor-btn-info">
                  <div className="tier-name">Royal Crown Penthouse &amp; Helipad</div>
                  <div className="tier-sub">AED 48.0M &middot; Trophy Allocation</div>
                </div>
              </button>

              <button
                type="button"
                className={`floor-select-btn ${activeFloor === 'skyline' ? 'active' : ''}`}
                onClick={() => setActiveFloor('skyline')}
              >
                <div className="floor-btn-num">L32-48</div>
                <div className="floor-btn-info">
                  <div className="tier-name">Skyline Duplex Residences</div>
                  <div className="tier-sub">From AED 18.5M &middot; 4 &amp; 5 Beds</div>
                </div>
              </button>

              <button
                type="button"
                className={`floor-select-btn ${activeFloor === 'terrace' ? 'active' : ''}`}
                onClick={() => setActiveFloor('terrace')}
              >
                <div className="floor-btn-num">L31</div>
                <div className="floor-btn-info">
                  <div className="tier-name">Suspended Infinity Club &amp; Spa</div>
                  <div className="tier-sub">Private Resident Wellness Deck</div>
                </div>
              </button>

              <button
                type="button"
                className={`floor-select-btn ${activeFloor === 'podium' ? 'active' : ''}`}
                onClick={() => setActiveFloor('podium')}
              >
                <div className="floor-btn-num">L01-30</div>
                <div className="floor-btn-info">
                  <div className="tier-name">Boulevard Suites &amp; Commercial HQ</div>
                  <div className="tier-sub">From AED 3.2M &middot; 8.2% Net Yield</div>
                </div>
              </button>
            </div>

            {/* Active Tier Specifications */}
            <div className="active-tier-details">
              <h4 className="active-tier-title">{currentFloor.title}</h4>
              <div className="active-tier-meta font-mono" dangerouslySetInnerHTML={{ __html: currentFloor.area }}></div>

              <div className="active-tier-price-row">
                <span className="price-tag">{currentFloor.price}</span>
                <span className="status-badge">{currentFloor.status}</span>
              </div>

              <div className="active-tier-features">
                {currentFloor.features.map((feat, i) => (
                  <div key={i} className="tier-feat-item">
                    <span className="gold-check-dot">&bull;</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="inspector-actions">
                <a
                  href={`https://wa.me/971501234567?text=${encodeURIComponent(
                    `Hello Nova Properties, I am exploring the 3D model for Nova Crown Tower and would like to receive the floorplans for ${currentFloor.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                  style={{ width: '100%' }}
                >
                  <span>Request Full 3D Dossier &amp; Allocation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
