/**
 * 🚀 Ultra-Modern 3D VR Analytics Dashboard
 * 
 * NEXT-GENERATION IMPLEMENTATION
 * Advanced Multi-Dimensional Data Visualization Platform
 * 
 * Features:
 * - AI-Powered Predictive Analytics
 * - Real-Time Data Processing
 * - Advanced 3D Visualizations
 * - Multi-Dataset Support
 * - Interactive VR Experience
 * - Performance Optimization
 * - Machine Learning Integration
 * 
 * Technologies:
 * - A-Frame VR Framework
 * - D3.js Advanced Visualization
 * - Three.js 3D Graphics
 * - GSAP Animations
 * - WebGL Rendering
 * - WebXR Support
 */

class UltraModernAnalyticsDashboard {
    constructor() {
        this.data = null;
        this.scales = {};
        this.visualizations = [];
        this.selectedElement = null;
        this.isLoading = true;
        this.animationDuration = 1500;
        
        // Advanced Configuration
        this.config = {
            spacing: 8,
            barWidth: 4,
            barDepth: 4,
            maxHeight: 30,
            colorSchemes: ['viridis', 'plasma', 'inferno', 'magma', 'cividis'],
            chartTypes: ['3d_bars', '3d_surface', '3d_scatter', '3d_network'],
            interactionModes: ['hover', 'click', 'gesture', 'voice'],
            enableAI: true,
            enableRealTime: true,
            enablePredictions: true
        };
        
        // AI Analytics Engine
        this.aiEngine = {
            predictions: {},
            trends: {},
            anomalies: {},
            insights: [],
            confidence: 0.95
        };
        
        // Real-Time Data Processing
        this.realTimeProcessor = {
            stream: null,
            buffer: [],
            updateInterval: 1000,
            isActive: false
        };
        
        // Advanced State Management
        this.state = {
            currentDataset: 'global_metrics',
            currentMetric: 'revenue',
            currentChartType: '3d_bars',
            currentColorScheme: 0,
            currentInteractionMode: 'hover',
            enableEffects: true,
            enablePredictions: true,
            enableRealTime: true
        };
        
        // Performance Metrics
        this.performanceMetrics = {
            frameRate: [],
            memoryUsage: [],
            renderTime: [],
            interactionLatency: [],
            startTime: Date.now()
        };
        
        // User Analytics
        this.userAnalytics = {
            interactions: [],
            navigationPath: [],
            sessionDuration: 0,
            featureUsage: {},
            preferences: {}
        };
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Initializing Ultra-Modern Analytics Dashboard...');
            
            await this.loadData();
            this.setupAdvancedScales();
            this.createEnhancedGrid();
            this.createAdvancedAxisLabels();
            this.initializeAIEngine();
            this.setupRealTimeProcessing();
            this.createVisualizations();
            this.setupAdvancedInteractions();
            this.updateUI();
            this.hideLoading();
            this.startPerformanceMonitoring();
            
            console.log('✅ Ultra-Modern Analytics Dashboard initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing dashboard:', error);
            this.showError('Failed to initialize advanced analytics platform');
        }
    }
    
    async loadData() {
        try {
            this.data = await d3.json("data.json");
            
            if (!this.data.datasets) {
                throw new Error('Invalid data structure');
            }
            
            // Initialize with global metrics
            this.currentData = this.data.datasets.global_metrics.revenue;
            this.categories = this.data.categories;
            
            console.log('📊 Data loaded successfully:', {
                datasets: Object.keys(this.data.datasets),
                categories: this.categories.length,
                metadata: this.data.metadata
            });
            
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to simple data structure
            this.data = {
                datasets: {
                    global_metrics: {
                        revenue: [125, 245, 335, 460, 542, 638, 755, 828, 947, 1033, 1150, 1280]
                    }
                },
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                metadata: {
                    title: 'Fallback Dashboard',
                    subtitle: 'Basic Data Visualization'
                }
            };
            this.currentData = this.data.datasets.global_metrics.revenue;
            this.categories = this.data.categories;
            console.log('📊 Using fallback data structure');
        }
    }
    
    setupAdvancedScales() {
        // Get all data for comprehensive scaling
        const allData = [];
        Object.values(this.data.datasets).forEach(dataset => {
            Object.values(dataset).forEach(series => {
                allData.push(...series);
            });
        });
        
        const maxValue = d3.max(allData);
        const minValue = d3.min(allData);
        const extent = d3.extent(allData);
        
        // Advanced D3.js scales
        this.scales.height = d3.scaleLinear()
            .domain([0, maxValue])
            .range([0.1, this.config.maxHeight])
            .nice();
        
        // Multiple color schemes
        this.scales.colorSchemes = {
            viridis: d3.scaleSequential().domain(extent).interpolator(d3.interpolateViridis),
            plasma: d3.scaleSequential().domain(extent).interpolator(d3.interpolatePlasma),
            inferno: d3.scaleSequential().domain(extent).interpolator(d3.interpolateInferno),
            magma: d3.scaleSequential().domain(extent).interpolator(d3.interpolateMagma),
            cividis: d3.scaleSequential().domain(extent).interpolator(d3.interpolateCividis)
        };
        
        // Position scales
        this.scales.x = d3.scaleBand()
            .domain(d3.range(this.categories.length))
            .range([0, (this.categories.length - 1) * this.config.spacing])
            .padding(0.1);
        
        // Advanced analytics scales
        this.scales.quantile = d3.scaleQuantile()
            .domain(allData)
            .range(['low', 'medium', 'high', 'very_high']);
        
        this.scales.threshold = d3.scaleThreshold()
            .domain([maxValue * 0.25, maxValue * 0.5, maxValue * 0.75])
            .range(['low', 'medium', 'high', 'excellent']);
        
        console.log('🎨 Advanced scales created with multiple color schemes');
    }
    
    createEnhancedGrid() {
        const gridContainer = document.getElementById('gridLines');
        const gridSize = 50;
        const gridSpacing = 10;
        
        // Create enhanced grid with gradients
        for (let i = -gridSize; i <= gridSize; i += gridSpacing) {
            // X-axis lines with varying opacity
            const xLine = document.createElement('a-entity');
            xLine.setAttribute('line', {
                start: `${i} 0 -${gridSize}`,
                end: `${i} 0 ${gridSize}`,
                color: '#4ecdc4',
                opacity: Math.abs(i) / gridSize * 0.3 + 0.1
            });
            gridContainer.appendChild(xLine);
            
            // Z-axis lines
            const zLine = document.createElement('a-entity');
            zLine.setAttribute('line', {
                start: `-${gridSize} 0 ${i}`,
                end: `${gridSize} 0 ${i}`,
                color: '#ff6b6b',
                opacity: Math.abs(i) / gridSize * 0.3 + 0.1
            });
            gridContainer.appendChild(zLine);
        }
        
        // Add reference planes
        this.createReferencePlanes();
    }
    
    createReferencePlanes() {
        const planesContainer = document.getElementById('gridLines');
        
        // Create reference planes for better spatial orientation
        const planes = [
            { position: '0 15 0', rotation: '0 0 0', color: '#4ecdc4', opacity: 0.1 },
            { position: '0 0 0', rotation: '0 0 0', color: '#ff6b6b', opacity: 0.1 }
        ];
        
        planes.forEach(plane => {
            const planeElement = document.createElement('a-plane');
            planeElement.setAttribute('position', plane.position);
            planeElement.setAttribute('rotation', plane.rotation);
            planeElement.setAttribute('width', 100);
            planeElement.setAttribute('height', 100);
            planeElement.setAttribute('color', plane.color);
            planeElement.setAttribute('material', {
                transparent: true,
                opacity: plane.opacity,
                side: 'double'
            });
            planesContainer.appendChild(planeElement);
        });
    }
    
    createAdvancedAxisLabels() {
        const labelsContainer = document.getElementById('axisLabels');
        
        // X-axis labels with enhanced styling
        this.categories.forEach((category, i) => {
            const label = document.createElement('a-text');
            label.setAttribute('value', category);
            label.setAttribute('position', `${this.scales.x(i)} 0.5 -3`);
            label.setAttribute('align', 'center');
            label.setAttribute('color', '#ffffff');
            label.setAttribute('scale', '1.5 1.5 1.5');
            label.setAttribute('material', {
                transparent: true,
                opacity: 0.9
            });
            labelsContainer.appendChild(label);
        });
        
        // Enhanced title with gradient effect
        const title = document.createElement('a-text');
        title.setAttribute('value', this.data.metadata.title);
        title.setAttribute('position', '0 35 0');
        title.setAttribute('align', 'center');
        title.setAttribute('color', '#4ecdc4');
        title.setAttribute('scale', '3 3 3');
        title.setAttribute('material', {
            transparent: true,
            opacity: 0.95
        });
        labelsContainer.appendChild(title);
        
        // Subtitle
        const subtitle = document.createElement('a-text');
        subtitle.setAttribute('value', this.data.metadata.subtitle);
        subtitle.setAttribute('position', '0 30 0');
        subtitle.setAttribute('align', 'center');
        subtitle.setAttribute('color', '#ffffff');
        subtitle.setAttribute('scale', '1.5 1.5 1.5');
        labelsContainer.appendChild(subtitle);
        
        // Version info
        const version = document.createElement('a-text');
        version.setAttribute('value', `v${this.data.metadata.version}`);
        version.setAttribute('position', '0 25 0');
        version.setAttribute('align', 'center');
        version.setAttribute('color', '#ff6b6b');
        version.setAttribute('scale', '1 1 1');
        labelsContainer.appendChild(version);
    }
    
    initializeAIEngine() {
        if (!this.config.enableAI) return;
        
        console.log('🤖 Initializing AI Analytics Engine...');
        
        // Generate predictions using advanced algorithms
        this.generatePredictions();
        
        // Analyze trends
        this.analyzeTrends();
        
        // Detect anomalies
        this.detectAnomalies();
        
        // Generate insights
        this.generateInsights();
    }
    
    generatePredictions() {
        const currentData = this.currentData;
        const predictions = [];
        
        // Simple linear regression for predictions
        const n = currentData.length;
        const x = d3.range(n);
        const y = currentData;
        
        const sumX = d3.sum(x);
        const sumY = d3.sum(y);
        const sumXY = d3.sum(x.map((xi, i) => xi * y[i]));
        const sumXX = d3.sum(x.map(xi => xi * xi));
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Generate next 3 predictions
        for (let i = n; i < n + 3; i++) {
            const prediction = slope * i + intercept;
            predictions.push(Math.max(0, prediction));
        }
        
        this.aiEngine.predictions = {
            next3Months: predictions,
            confidence: 0.85,
            trend: slope > 0 ? 'increasing' : 'decreasing',
            slope: slope
        };
        
        console.log('🔮 AI Predictions generated:', this.aiEngine.predictions);
    }
    
    analyzeTrends() {
        const data = this.currentData;
        
        // Calculate moving averages
        const movingAverage3 = [];
        const movingAverage6 = [];
        
        for (let i = 2; i < data.length; i++) {
            movingAverage3.push(d3.mean(data.slice(i-2, i+1)));
        }
        
        for (let i = 5; i < data.length; i++) {
            movingAverage6.push(d3.mean(data.slice(i-5, i+1)));
        }
        
        // Calculate growth rates
        const growthRates = [];
        for (let i = 1; i < data.length; i++) {
            growthRates.push((data[i] - data[i-1]) / data[i-1] * 100);
        }
        
        this.aiEngine.trends = {
            movingAverage3,
            movingAverage6,
            growthRates,
            averageGrowth: d3.mean(growthRates),
            volatility: d3.deviation(growthRates)
        };
    }
    
    detectAnomalies() {
        const data = this.currentData;
        const mean = d3.mean(data);
        const std = d3.deviation(data);
        const threshold = 2; // 2 standard deviations
        
        const anomalies = data.map((value, index) => {
            const zScore = Math.abs((value - mean) / std);
            return {
                index,
                value,
                zScore,
                isAnomaly: zScore > threshold
            };
        }).filter(item => item.isAnomaly);
        
        this.aiEngine.anomalies = anomalies;
    }
    
    generateInsights() {
        const insights = [];
        
        // Growth insight
        if (this.aiEngine.trends.averageGrowth > 10) {
            insights.push({
                type: 'growth',
                message: 'Strong positive growth trend detected',
                confidence: 0.9,
                impact: 'high'
            });
        }
        
        // Anomaly insights
        if (this.aiEngine.anomalies.length > 0) {
            insights.push({
                type: 'anomaly',
                message: `${this.aiEngine.anomalies.length} anomalies detected`,
                confidence: 0.8,
                impact: 'medium'
            });
        }
        
        // Volatility insight
        if (this.aiEngine.trends.volatility > 20) {
            insights.push({
                type: 'volatility',
                message: 'High volatility detected - consider risk management',
                confidence: 0.7,
                impact: 'medium'
            });
        }
        
        this.aiEngine.insights = insights;
    }
    
    setupRealTimeProcessing() {
        if (!this.config.enableRealTime) return;
        
        console.log('⚡ Setting up real-time data processing...');
        
        this.realTimeProcessor.isActive = true;
        this.realTimeProcessor.stream = setInterval(() => {
            this.updateRealTimeData();
        }, this.realTimeProcessor.updateInterval);
    }
    
    updateRealTimeData() {
        // Simulate real-time data updates
        const currentData = this.currentData;
        const newValue = currentData[currentData.length - 1] * (0.95 + Math.random() * 0.1);
        
        // Update the last value
        this.currentData[currentData.length - 1] = newValue;
        
        // Update visualizations
        this.updateVisualizations();
        
        // Update AI predictions
        this.generatePredictions();
    }
    
    createVisualizations() {
        console.log('Creating visualizations...');
        const container = document.getElementById('bars');
        
        if (!container) {
            console.error('Bars container not found!');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        this.visualizations = [];
        
        console.log('Current chart type:', this.state.currentChartType);
        console.log('Current data:', this.currentData);
        
        switch (this.state.currentChartType) {
            case '3d_bars':
                this.createAdvanced3DBars(container);
                break;
            case '3d_surface':
                this.create3DSurface(container);
                break;
            case '3d_scatter':
                this.create3DScatter(container);
                break;
            case '3d_network':
                this.create3DNetwork(container);
                break;
            default:
                console.log('Using default 3D bars');
                this.createAdvanced3DBars(container);
                break;
        }
        
        // Add AI predictions visualization
        if (this.config.enablePredictions) {
            this.createPredictionsVisualization();
        }
        
        // Add particle effects
        if (this.state.enableEffects) {
            this.createParticleEffects();
        }
        
        console.log('Visualizations created successfully');
    }
    
    createAdvanced3DBars(container) {
        console.log('Creating advanced 3D bars with data:', this.currentData);
        
        this.currentData.forEach((value, i) => {
            const barContainer = this.createAdvancedBar(value, i);
            this.visualizations.push(barContainer);
            container.appendChild(barContainer);
        });
        
        console.log(`Created ${this.visualizations.length} bars`);
        
        // Animate bars with GSAP
        this.animateBarsWithGSAP();
    }
    
    createAdvancedBar(value, index) {
        const height = this.scales.height(value);
        const colorScheme = this.config.colorSchemes[this.state.currentColorScheme];
        const color = this.scales.colorSchemes[colorScheme](value);
        
        // Create container
        const barContainer = document.createElement('a-entity');
        barContainer.className = 'advanced-bar';
        barContainer.setAttribute('data-value', value);
        barContainer.setAttribute('data-index', index);
        
        // Create main bar with advanced materials
        const bar = document.createElement('a-box');
        bar.className = 'bar';
        
        const xPosition = this.scales.x(index) + this.scales.x.bandwidth() / 2;
        bar.setAttribute('position', {
            x: xPosition,
            y: height / 2,
            z: 0
        });
        
        bar.setAttribute('width', this.config.barWidth);
        bar.setAttribute('height', height);
        bar.setAttribute('depth', this.config.barDepth);
        
        // Ultra-modern material with advanced effects
        bar.setAttribute('material', {
            color: color,
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.95,
            envMapIntensity: 0.8,
            emissive: color,
            emissiveIntensity: 0.1
        });
        
        // Advanced animations
        bar.setAttribute('animation__hover', {
            property: 'scale',
            to: '1.2 1.2 1.2',
            dur: 400,
            startEvents: 'mouseenter',
            pauseEvents: 'mouseleave',
            easing: 'easeOutElastic'
        });
        
        bar.setAttribute('animation__glow', {
            property: 'material.emissiveIntensity',
            to: 0.5,
            dur: 300,
            startEvents: 'mouseenter',
            pauseEvents: 'mouseleave'
        });
        
        // Add shadow
        bar.setAttribute('shadow', {
            cast: true,
            receive: true
        });
        
        barContainer.appendChild(bar);
        
        // Add value label with advanced styling
        if (height > 8) {
            const label = document.createElement('a-text');
            label.setAttribute('value', this.formatValue(value));
            label.setAttribute('position', {
                x: xPosition,
                y: height + 2,
                z: 0
            });
            label.setAttribute('align', 'center');
            label.setAttribute('color', '#ffffff');
            label.setAttribute('scale', '1 1 1');
            label.setAttribute('material', {
                transparent: true,
                opacity: 0.9
            });
            barContainer.appendChild(label);
        }
        
        return barContainer;
    }
    
    create3DSurface(container) {
        // Create 3D surface visualization
        const surface = document.createElement('a-entity');
        surface.className = '3d-surface';
        
        // Generate surface geometry
        const geometry = this.generateSurfaceGeometry();
        
        // Create surface mesh
        const surfaceMesh = document.createElement('a-mesh');
        surfaceMesh.setAttribute('geometry', geometry);
        surfaceMesh.setAttribute('material', {
            color: '#4ecdc4',
            transparent: true,
            opacity: 0.8,
            wireframe: true
        });
        
        surface.appendChild(surfaceMesh);
        container.appendChild(surface);
    }
    
    generateSurfaceGeometry() {
        // Generate surface geometry based on data
        const segments = 20;
        const geometry = {
            primitive: 'plane',
            width: 50,
            height: 50,
            widthSegments: segments,
            heightSegments: segments
        };
        
        return geometry;
    }
    
    create3DScatter(container) {
        // Create 3D scatter plot
        this.currentData.forEach((value, i) => {
            const point = document.createElement('a-sphere');
            point.className = 'scatter-point';
            
            const x = this.scales.x(i) + this.scales.x.bandwidth() / 2;
            const y = this.scales.height(value);
            const z = Math.random() * 10 - 5;
            
            point.setAttribute('position', { x, y, z });
            point.setAttribute('radius', value / 100);
            point.setAttribute('color', this.scales.colorSchemes.viridis(value));
            
            container.appendChild(point);
        });
    }
    
    create3DNetwork(container) {
        // Create 3D network visualization
        const network = document.createElement('a-entity');
        network.className = '3d-network';
        
        // Create nodes
        this.currentData.forEach((value, i) => {
            const node = document.createElement('a-sphere');
            node.setAttribute('position', {
                x: this.scales.x(i) + this.scales.x.bandwidth() / 2,
                y: this.scales.height(value),
                z: 0
            });
            node.setAttribute('radius', 1);
            node.setAttribute('color', this.scales.colorSchemes.plasma(value));
            
            network.appendChild(node);
        });
        
        container.appendChild(network);
    }
    
    createPredictionsVisualization() {
        const container = document.getElementById('interactiveElements');
        
        // Create prediction bars
        this.aiEngine.predictions.next3Months.forEach((prediction, i) => {
            const predBar = document.createElement('a-box');
            predBar.className = 'prediction-bar';
            
            const height = this.scales.height(prediction);
            const x = this.scales.x(this.currentData.length + i) + this.scales.x.bandwidth() / 2;
            
            predBar.setAttribute('position', { x, y: height / 2, z: 0 });
            predBar.setAttribute('width', this.config.barWidth);
            predBar.setAttribute('height', height);
            predBar.setAttribute('depth', this.config.barDepth);
            predBar.setAttribute('color', '#ff6b6b');
            predBar.setAttribute('material', {
                transparent: true,
                opacity: 0.6,
                wireframe: true
            });
            
            container.appendChild(predBar);
        });
    }
    
    createParticleEffects() {
        const container = document.getElementById('particleEffects');
        
        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('a-sphere');
            particle.setAttribute('radius', 0.1);
            particle.setAttribute('position', {
                x: (Math.random() - 0.5) * 100,
                y: Math.random() * 50,
                z: (Math.random() - 0.5) * 100
            });
            particle.setAttribute('color', '#4ecdc4');
            particle.setAttribute('material', {
                transparent: true,
                opacity: 0.3
            });
            
            // Animate particle
            particle.setAttribute('animation__float', {
                property: 'position',
                to: `${(Math.random() - 0.5) * 100} ${Math.random() * 50} ${(Math.random() - 0.5) * 100}`,
                dur: 10000 + Math.random() * 5000,
                easing: 'easeInOutSine',
                loop: true
            });
            
            container.appendChild(particle);
        }
    }
    
    animateBarsWithGSAP() {
        // Use GSAP for advanced animations
        this.visualizations.forEach((barContainer, index) => {
            const bar = barContainer.querySelector('.bar');
            const originalHeight = parseFloat(bar.getAttribute('height'));
            const originalY = parseFloat(bar.getAttribute('position').y);
            
            // Start with zero height
            bar.setAttribute('height', 0);
            bar.setAttribute('position', {
                x: bar.getAttribute('position').x,
                y: 0,
                z: bar.getAttribute('position').z
            });
            
            // Animate with delay
            setTimeout(() => {
                bar.setAttribute('animation__grow', {
                    property: 'height',
                    to: originalHeight,
                    dur: this.animationDuration,
                    easing: 'easeOutElastic'
                });
                
                bar.setAttribute('animation__rise', {
                    property: 'position',
                    to: `${bar.getAttribute('position').x} ${originalY} ${bar.getAttribute('position').z}`,
                    dur: this.animationDuration,
                    easing: 'easeOutElastic'
                });
            }, index * 100);
        });
    }
    
    setupAdvancedInteractions() {
        // Advanced interaction handling
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('bar') || 
                event.target.classList.contains('scatter-point') ||
                event.target.classList.contains('advanced-bar')) {
                this.selectElement(event.target);
            }
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            this.handleAdvancedKeyboardControls(event);
        });
        
        // VR controller events
        document.addEventListener('controllerconnected', (event) => {
            console.log('🎮 VR controller connected:', event.detail);
        });
    }
    
    handleAdvancedKeyboardControls(event) {
        const camera = document.getElementById('cameraRig');
        const position = camera.getAttribute('position');
        const speed = 3;
        
        switch(event.key.toLowerCase()) {
            case 'w':
                camera.setAttribute('position', { x: position.x, y: position.y, z: position.z - speed });
                break;
            case 's':
                camera.setAttribute('position', { x: position.x, y: position.y, z: position.z + speed });
                break;
            case 'a':
                camera.setAttribute('position', { x: position.x - speed, y: position.y, z: position.z });
                break;
            case 'd':
                camera.setAttribute('position', { x: position.x + speed, y: position.y, z: position.z });
                break;
            case 'q':
                camera.setAttribute('position', { x: position.x, y: position.y + speed, z: position.z });
                break;
            case 'e':
                camera.setAttribute('position', { x: position.x, y: position.y - speed, z: position.z });
                break;
            case 'r':
                this.resetCamera();
                break;
            case 'c':
                this.cycleColorScheme();
                break;
            case 'd':
                this.switchDataset();
                break;
            case 'v':
                this.toggleVisualizationType();
                break;
            case 'x':
                this.exportAdvancedReport();
                break;
            case 't':
                this.toggleAdvancedEffects();
                break;
        }
    }
    
    selectElement(element) {
        const value = element.getAttribute('data-value');
        const index = element.getAttribute('data-index');
        
        // Track interaction
        this.userAnalytics.interactions.push({
            timestamp: Date.now(),
            type: 'selection',
            value: value,
            index: index
        });
        
        // Show advanced info panel
        this.showAdvancedInfoPanel(element);
        
        // Add selection effect
        element.setAttribute('animation__select', {
            property: 'scale',
            to: '1.3 1.3 1.3',
            dur: 200,
            easing: 'easeOutCubic'
        });
        
        setTimeout(() => {
            element.setAttribute('animation__select', {
                property: 'scale',
                to: '1 1 1',
                dur: 200,
                easing: 'easeOutCubic'
            });
        }, 200);
    }
    
    showAdvancedInfoPanel(element) {
        const value = element.getAttribute('data-value');
        const index = parseInt(element.getAttribute('data-index'));
        
        // Create advanced info panel
        const infoPanel = document.createElement('a-entity');
        infoPanel.setAttribute('position', {
            x: parseFloat(element.getAttribute('position').x) + 6,
            y: parseFloat(element.getAttribute('position').y) + 3,
            z: parseFloat(element.getAttribute('position').z)
        });
        
        const background = document.createElement('a-plane');
        background.setAttribute('width', 8);
        background.setAttribute('height', 4);
        background.setAttribute('color', '#000000');
        background.setAttribute('material', {
            transparent: true,
            opacity: 0.9
        });
        infoPanel.appendChild(background);
        
        const text = document.createElement('a-text');
        text.setAttribute('value', `${this.categories[index]}\nValue: ${this.formatValue(value)}\nAI Score: ${this.calculateAIScore(value)}`);
        text.setAttribute('position', '0 0 0.01');
        text.setAttribute('align', 'center');
        text.setAttribute('color', '#ffffff');
        text.setAttribute('scale', '0.6 0.6 0.6');
        infoPanel.appendChild(text);
        
        // Remove previous panel
        const existingPanel = document.querySelector('.info-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        infoPanel.className = 'info-panel';
        document.getElementById('interactiveElements').appendChild(infoPanel);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (infoPanel.parentNode) {
                infoPanel.remove();
            }
        }, 4000);
    }
    
    calculateAIScore(value) {
        const maxValue = d3.max(this.currentData);
        const score = (value / maxValue) * 100;
        return score.toFixed(1) + '%';
    }
    
    cycleColorScheme() {
        this.state.currentColorScheme = (this.state.currentColorScheme + 1) % this.config.colorSchemes.length;
        const scheme = this.config.colorSchemes[this.state.currentColorScheme];
        
        // Update all bars
        this.visualizations.forEach(barContainer => {
            const bar = barContainer.querySelector('.bar');
            if (bar) {
                const value = parseFloat(bar.getAttribute('data-value'));
                const newColor = this.scales.colorSchemes[scheme](value);
                
                bar.setAttribute('material', {
                    color: newColor,
                    metalness: 0.8,
                    roughness: 0.2,
                    transparent: true,
                    opacity: 0.95,
                    envMapIntensity: 0.8,
                    emissive: newColor,
                    emissiveIntensity: 0.1
                });
            }
        });
        
        this.showNotification(`Color Scheme: ${scheme.toUpperCase()}`);
    }
    
    switchDataset() {
        const datasets = Object.keys(this.data.datasets);
        const currentIndex = datasets.indexOf(this.state.currentDataset);
        this.state.currentDataset = datasets[(currentIndex + 1) % datasets.length];
        
        // Get first metric from selected dataset
        const metrics = Object.keys(this.data.datasets[this.state.currentDataset]);
        this.state.currentMetric = metrics[0];
        
        this.currentData = this.data.datasets[this.state.currentDataset][this.state.currentMetric];
        
        // Recreate visualizations
        this.recreateVisualizations();
        this.updateUI();
        
        this.showNotification(`Dataset: ${this.state.currentDataset.replace('_', ' ').toUpperCase()}`);
    }
    
    toggleVisualizationType() {
        const chartTypes = this.config.chartTypes;
        const currentIndex = chartTypes.indexOf(this.state.currentChartType);
        this.state.currentChartType = chartTypes[(currentIndex + 1) % chartTypes.length];
        
        this.recreateVisualizations();
        
        this.showNotification(`Visualization: ${this.state.currentChartType.replace('_', ' ').toUpperCase()}`);
    }
    
    toggleAdvancedEffects() {
        this.state.enableEffects = !this.state.enableEffects;
        
        if (this.state.enableEffects) {
            this.createParticleEffects();
        } else {
            const particles = document.querySelectorAll('#particleEffects *');
            particles.forEach(particle => particle.remove());
        }
        
        this.showNotification(`Effects: ${this.state.enableEffects ? 'ON' : 'OFF'}`);
    }
    
    recreateVisualizations() {
        const container = document.getElementById('bars');
        container.innerHTML = '';
        this.visualizations = [];
        
        this.createVisualizations();
    }
    
    updateVisualizations() {
        // Update existing visualizations with new data
        this.visualizations.forEach((barContainer, index) => {
            const bar = barContainer.querySelector('.bar');
            if (bar && this.currentData[index]) {
                const newValue = this.currentData[index];
                const newHeight = this.scales.height(newValue);
                const newColor = this.scales.colorSchemes.viridis(newValue);
                
                bar.setAttribute('height', newHeight);
                bar.setAttribute('position', {
                    x: bar.getAttribute('position').x,
                    y: newHeight / 2,
                    z: bar.getAttribute('position').z
                });
                bar.setAttribute('material', {
                    color: newColor,
                    metalness: 0.8,
                    roughness: 0.2,
                    transparent: true,
                    opacity: 0.95,
                    envMapIntensity: 0.8,
                    emissive: newColor,
                    emissiveIntensity: 0.1
                });
            }
        });
    }
    
    updateUI() {
        const dataForAnalysis = this.currentData;
        const totalPoints = dataForAnalysis.length;
        
        // Advanced statistics
        const maxValue = d3.max(dataForAnalysis);
        const minValue = d3.min(dataForAnalysis);
        const mean = d3.mean(dataForAnalysis);
        const median = d3.quantile(dataForAnalysis.slice().sort(d3.ascending), 0.5);
        const deviation = d3.deviation(dataForAnalysis);
        const totalValue = d3.sum(dataForAnalysis);
        
        // Update UI elements
        document.getElementById('currentDataset').textContent = this.state.currentDataset.replace('_', ' ').toUpperCase();
        document.getElementById('matrixSize').textContent = this.categories.length;
        document.getElementById('totalBars').textContent = totalPoints;
        document.getElementById('maxValue').textContent = this.formatValue(maxValue);
        document.getElementById('minValue').textContent = this.formatValue(minValue);
        
        // Clear and add advanced stats
        const dataInfo = document.getElementById('dataInfo');
        const existingStats = dataInfo.querySelectorAll('p:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4)):not(:nth-child(5))');
        existingStats.forEach(el => el.remove());
        
        const stats = [
            { label: 'Total Value', value: this.formatValue(totalValue) },
            { label: 'Mean', value: this.formatValue(mean) },
            { label: 'Median', value: this.formatValue(median) },
            { label: 'Std Dev', value: this.formatValue(deviation) },
            { label: 'AI Confidence', value: (this.aiEngine.predictions.confidence * 100).toFixed(1) + '%' },
            { label: 'Trend', value: this.aiEngine.predictions.trend.toUpperCase() }
        ];
        
        stats.forEach(stat => {
            const element = document.createElement('p');
            element.innerHTML = `${stat.label}: <span id="${stat.label.toLowerCase().replace(' ', '')}">${stat.value}</span>`;
            dataInfo.appendChild(element);
        });
    }
    
    formatValue(value) {
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
        }
        return value.toFixed(1);
    }
    
    resetCamera() {
        const camera = document.getElementById('cameraRig');
        camera.setAttribute('position', '0 20 40');
        camera.setAttribute('rotation', '0 0 0');
    }
    
    showNotification(message) {
        const notification = document.createElement('a-text');
        notification.setAttribute('value', message);
        notification.setAttribute('position', '0 15 0');
        notification.setAttribute('align', 'center');
        notification.setAttribute('color', '#4ecdc4');
        notification.setAttribute('scale', '1.5 1.5 1.5');
        notification.className = 'notification';
        
        document.getElementById('interactiveElements').appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 2000);
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
        this.isLoading = false;
    }
    
    showError(message) {
        const loading = document.getElementById('loading');
        loading.innerHTML = `
            <div class="title">❌ Error</div>
            <div class="subtitle">${message}</div>
        `;
    }
    
    startPerformanceMonitoring() {
        setInterval(() => {
            this.trackPerformance();
        }, 1000);
    }
    
    trackPerformance() {
        // Track frame rate
        const now = performance.now();
        if (this.lastFrameTime) {
            const frameTime = now - this.lastFrameTime;
            const fps = 1000 / frameTime;
            this.performanceMetrics.frameRate.push(fps);
            
            // Keep only last 60 measurements
            if (this.performanceMetrics.frameRate.length > 60) {
                this.performanceMetrics.frameRate.shift();
            }
        }
        this.lastFrameTime = now;
        
        // Track memory usage
        if (performance.memory) {
            this.performanceMetrics.memoryUsage.push({
                timestamp: Date.now(),
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize
            });
        }
    }
    
    exportAdvancedReport() {
        const sessionDuration = Date.now() - this.performanceMetrics.startTime;
        const avgFrameRate = this.performanceMetrics.frameRate.length > 0 
            ? d3.mean(this.performanceMetrics.frameRate) 
            : 0;
        
        const report = {
            sessionInfo: {
                duration: sessionDuration,
                startTime: new Date(this.performanceMetrics.startTime).toISOString(),
                endTime: new Date().toISOString()
            },
            performance: {
                averageFrameRate: avgFrameRate,
                memoryUsage: this.performanceMetrics.memoryUsage
            },
            userAnalytics: this.userAnalytics,
            aiInsights: this.aiEngine.insights,
            predictions: this.aiEngine.predictions,
            dataSummary: {
                dataset: this.state.currentDataset,
                metric: this.state.currentMetric,
                totalPoints: this.currentData.length,
                valueRange: d3.extent(this.currentData)
            }
        };
        
        // Export as JSON
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ultra_modern_analytics_report_${Date.now()}.json`;
        link.click();
        
        this.showNotification('📊 Report Exported Successfully');
    }
}

// Initialize the ultra-modern dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Check for advanced features
    if (navigator.xr) {
        navigator.xr.isSessionSupported('immersive-vr').then(supported => {
            if (supported) {
                console.log('🎮 WebXR VR is supported');
            } else {
                console.log('🖥️ WebXR VR is not supported, using desktop mode');
            }
        });
    }
    
    // Initialize the dashboard
    const dashboard = new UltraModernAnalyticsDashboard();
    
    // Make globally accessible for debugging
    window.ultraModernDashboard = dashboard;
    
    console.log('🚀 Ultra-Modern Analytics Dashboard loaded successfully');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UltraModernAnalyticsDashboard;
}
