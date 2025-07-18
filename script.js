/**
 * 3D Bar Chart VR - Immersive Analytics Application
 * Based on Jansen et al. (2013) Physical Visualizations
 * 
 * Features:
 * - D3.js data processing and visualization
 * - Interactive 3D bar chart with hover effects
 * - VR-ready with A-Frame framework
 * - Performance optimized rendering
 * - Immersive analytics capabilities
 * - Real-time data visualization
 */

class BarChartVR {
    constructor() {
        this.data = null;
        this.scales = {};
        this.bars = [];
        this.selectedBar = null;
        this.isLoading = true;
        this.animationDuration = 1000;
        
        // Configuration
        this.config = {
            spacing: 3.5,  // Reduced spacing for more bars
            barWidth: 2.2,  // Slightly smaller bars
            barDepth: 2.2,  // Slightly smaller bars
            maxHeight: 35,  // Increased max height
            colorScheme: d3.schemeCategory10,
            animationEasing: d3.easeCubicOut,
            enableClustering: true,  // Enable bar clustering
            enableValueLabels: true  // Show value labels on bars
        };
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadData();
            this.setupScales();
            this.createGrid();
            this.createAxisLabels();
            this.createBars();
            this.setupInteractions();
            this.updateUI();
            this.hideLoading();
            
            console.log('3D Bar Chart VR initialized successfully');
        } catch (error) {
            console.error('Error initializing 3D Bar Chart VR:', error);
            this.showError('Failed to load visualization');
        }
    }
    
    async loadData() {
        try {
            this.data = await d3.json("data.json");
            
            // Validate data structure
            if (!Array.isArray(this.data) || this.data.length === 0) {
                throw new Error('Invalid data format');
            }
            
            // Flatten data for analysis
            this.flatData = this.data.flat();
            
            console.log('Data loaded successfully:', {
                rows: this.data.length,
                cols: this.data[0].length,
                totalBars: this.flatData.length,
                maxValue: Math.max(...this.flatData),
                minValue: Math.min(...this.flatData)
            });
            
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }
    
    setupScales() {
        const maxValue = Math.max(...this.flatData);
        const minValue = Math.min(...this.flatData);
        
        // Height scale
        this.scales.height = d3.scaleLinear()
            .domain([minValue, maxValue])
            .range([0.1, this.config.maxHeight]);
        
        // Color scale
        this.scales.color = d3.scaleSequential()
            .domain([minValue, maxValue])
            .interpolator(d3.interpolateViridis);
        
        // Position scales
        this.scales.x = d3.scaleLinear()
            .domain([0, this.data[0].length - 1])
            .range([0, (this.data[0].length - 1) * this.config.spacing]);
        
        this.scales.z = d3.scaleLinear()
            .domain([0, this.data.length - 1])
            .range([0, (this.data.length - 1) * this.config.spacing]);
    }
    
    createGrid() {
        const gridContainer = document.getElementById('gridLines');
        const gridSize = 40;
        const gridSpacing = 10;
        
        // Create grid lines
        for (let i = -gridSize; i <= gridSize; i += gridSpacing) {
            // X-axis lines
            const xLine = document.createElement('a-entity');
            xLine.setAttribute('line', {
                start: `${i} 0 -${gridSize}`,
                end: `${i} 0 ${gridSize}`,
                color: '#333333'
            });
            gridContainer.appendChild(xLine);
            
            // Z-axis lines
            const zLine = document.createElement('a-entity');
            zLine.setAttribute('line', {
                start: `-${gridSize} 0 ${i}`,
                end: `${gridSize} 0 ${i}`,
                color: '#333333'
            });
            gridContainer.appendChild(zLine);
        }
    }
    
    createAxisLabels() {
        const labelsContainer = document.getElementById('axisLabels');
        
        // X-axis labels (Quarters)
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'];
        for (let i = 0; i < this.data[0].length; i++) {
            const label = document.createElement('a-text');
            label.setAttribute('value', quarters[i]);
            label.setAttribute('position', `${this.scales.x(i)} 0.5 -2`);
            label.setAttribute('align', 'center');
            label.setAttribute('color', '#ffffff');
            label.setAttribute('scale', '1.5 1.5 1.5');
            labelsContainer.appendChild(label);
        }
        
        // Z-axis labels (Product Categories)
        const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Beauty', 'Toys', 'Food', 'Automotive', 'Health', 'Garden', 'Office', 'Jewelry', 'Pet', 'Music', 'Art'];
        for (let i = 0; i < this.data.length; i++) {
            const label = document.createElement('a-text');
            label.setAttribute('value', categories[i]);
            label.setAttribute('position', `-8 0.5 ${this.scales.z(i)}`);
            label.setAttribute('align', 'right');
            label.setAttribute('color', '#ffffff');
            label.setAttribute('scale', '1 1 1');
            labelsContainer.appendChild(label);
        }
        
        // Y-axis label
        const yLabel = document.createElement('a-text');
        yLabel.setAttribute('value', 'Sales ($K)');
        yLabel.setAttribute('position', '-12 20 0');
        yLabel.setAttribute('align', 'center');
        yLabel.setAttribute('color', '#ffffff');
        yLabel.setAttribute('scale', '2.5 2.5 2.5');
        labelsContainer.appendChild(yLabel);
        
        // Title
        const title = document.createElement('a-text');
        title.setAttribute('value', 'Quarterly Sales Performance');
        title.setAttribute('position', '0 25 0');
        title.setAttribute('align', 'center');
        title.setAttribute('color', '#4ecdc4');
        title.setAttribute('scale', '3 3 3');
        labelsContainer.appendChild(title);
        
        // Subtitle
        const subtitle = document.createElement('a-text');
        subtitle.setAttribute('value', '2022-2024 by Product Category');
        subtitle.setAttribute('position', '0 22 0');
        subtitle.setAttribute('align', 'center');
        subtitle.setAttribute('color', '#ffffff');
        subtitle.setAttribute('scale', '1.5 1.5 1.5');
        labelsContainer.appendChild(subtitle);
    }
    
    createBars() {
        const barsContainer = document.getElementById('bars');
        
        this.data.forEach((row, i) => {
            row.forEach((value, j) => {
                const barContainer = this.createBar(value, i, j);
                this.bars.push(barContainer);
                barsContainer.appendChild(barContainer);
            });
        });
        
        // Animate bars in
        this.animateBarsIn();
        
        // Create additional bar clusters if enabled
        if (this.config.enableClustering) {
            this.createAdditionalClusters();
        }
    }
    
    createAdditionalClusters() {
        const barsContainer = document.getElementById('bars');
        
        // Create additional clusters around the main chart
        const clusterPositions = [
            { x: 60, z: 0, scale: 0.8 },
            { x: -60, z: 0, scale: 0.8 },
            { x: 0, z: 60, scale: 0.8 },
            { x: 0, z: -60, scale: 0.8 },
            { x: 40, z: 40, scale: 0.6 },
            { x: -40, z: -40, scale: 0.6 }
        ];
        
        clusterPositions.forEach((cluster, clusterIndex) => {
            const clusterContainer = document.createElement('a-entity');
            clusterContainer.className = 'bar-cluster';
            clusterContainer.setAttribute('position', `${cluster.x} 0 ${cluster.z}`);
            clusterContainer.setAttribute('scale', `${cluster.scale} ${cluster.scale} ${cluster.scale}`);
            
            // Create a smaller dataset for each cluster
            const clusterData = this.generateClusterData(4, 4);
            
            clusterData.forEach((row, i) => {
                row.forEach((value, j) => {
                    const barContainer = this.createClusterBar(value, i, j, clusterIndex);
                    this.bars.push(barContainer);
                    clusterContainer.appendChild(barContainer);
                });
            });
            
            barsContainer.appendChild(clusterContainer);
        });
    }
    
    generateClusterData(rows, cols) {
        // Generate meaningful regional data
        const regions = [
            [45, 67, 89, 112, 78, 95, 123, 145, 89, 112, 134, 156, 67, 89, 112, 134], // North America
            [34, 56, 78, 95, 67, 89, 112, 134, 78, 95, 123, 145, 56, 78, 95, 123],   // Europe
            [23, 45, 67, 89, 45, 67, 89, 112, 67, 89, 112, 134, 45, 67, 89, 112],   // Asia Pacific
            [12, 34, 56, 78, 34, 56, 78, 95, 56, 78, 95, 123, 34, 56, 78, 95],      // Latin America
            [67, 89, 112, 134, 89, 112, 134, 156, 112, 134, 156, 178, 89, 112, 134, 156], // Middle East
            [56, 78, 95, 123, 78, 95, 123, 145, 95, 123, 145, 167, 78, 95, 123, 145]  // Africa
        ];
        
        return regions;
    }
    
    createClusterBar(value, rowIndex, colIndex, clusterIndex) {
        const height = this.scales.height(value);
        const color = this.scales.color(value);
        
        // Create container for bar and label
        const barContainer = document.createElement('a-entity');
        barContainer.className = 'bar-container cluster-bar';
        barContainer.setAttribute('data-value', value);
        barContainer.setAttribute('data-row', rowIndex);
        barContainer.setAttribute('data-col', colIndex);
        barContainer.setAttribute('data-cluster', clusterIndex);
        
        // Create the bar
        const bar = document.createElement('a-box');
        bar.className = 'bar';
        bar.setAttribute('data-value', value);
        bar.setAttribute('data-row', rowIndex);
        bar.setAttribute('data-col', colIndex);
        bar.setAttribute('data-cluster', clusterIndex);
        
        // Position within cluster
        const spacing = 2.5;
        bar.setAttribute('position', {
            x: colIndex * spacing,
            y: height / 2,
            z: rowIndex * spacing
        });
        
        // Dimensions
        bar.setAttribute('width', this.config.barWidth * 0.8);
        bar.setAttribute('height', height);
        bar.setAttribute('depth', this.config.barDepth * 0.8);
        
        // Material with different color scheme for clusters
        bar.setAttribute('material', {
            color: color,
            metalness: 0.5,
            roughness: 0.2,
            transparent: true,
            opacity: 0.9,
            envMapIntensity: 0.6
        });
        
        // Shadow
        bar.setAttribute('shadow', {
            cast: true,
            receive: true
        });
        
        // Animations
        bar.setAttribute('animation__hover', {
            property: 'scale',
            to: '1.1 1.1 1.1',
            dur: 200,
            startEvents: 'mouseenter',
            pauseEvents: 'mouseleave'
        });
        
        bar.setAttribute('animation__click', {
            property: 'rotation',
            to: '0 360 0',
            dur: 800,
            startEvents: 'click'
        });
        
        barContainer.appendChild(bar);
        
        return barContainer;
    }
    
    createBar(value, rowIndex, colIndex) {
        const height = this.scales.height(value);
        const color = this.scales.color(value);
        
        // Create container for bar and label
        const barContainer = document.createElement('a-entity');
        barContainer.className = 'bar-container';
        barContainer.setAttribute('data-value', value);
        barContainer.setAttribute('data-row', rowIndex);
        barContainer.setAttribute('data-col', colIndex);
        
        // Create the bar
        const bar = document.createElement('a-box');
        bar.className = 'bar';
        bar.setAttribute('data-value', value);
        bar.setAttribute('data-row', rowIndex);
        bar.setAttribute('data-col', colIndex);
        
        // Position
        bar.setAttribute('position', {
            x: this.scales.x(colIndex),
            y: height / 2,
            z: this.scales.z(rowIndex)
        });
        
        // Dimensions
        bar.setAttribute('width', this.config.barWidth);
        bar.setAttribute('height', height);
        bar.setAttribute('depth', this.config.barDepth);
        
        // Enhanced material with better visual effects
        bar.setAttribute('material', {
            color: color,
            metalness: 0.4,
            roughness: 0.3,
            transparent: true,
            opacity: 0.95,
            envMapIntensity: 0.5
        });
        
        // Shadow
        bar.setAttribute('shadow', {
            cast: true,
            receive: true
        });
        
        // Enhanced animations
        bar.setAttribute('animation__hover', {
            property: 'scale',
            to: '1.15 1.15 1.15',
            dur: 300,
            startEvents: 'mouseenter',
            pauseEvents: 'mouseleave',
            easing: 'easeOutCubic'
        });
        
        bar.setAttribute('animation__click', {
            property: 'rotation',
            to: '0 360 0',
            dur: 1200,
            startEvents: 'click',
            easing: 'easeInOutCubic'
        });
        
        // Add glow effect on hover
        bar.setAttribute('animation__glow', {
            property: 'material.emissiveIntensity',
            to: 0.3,
            dur: 300,
            startEvents: 'mouseenter',
            pauseEvents: 'mouseleave'
        });
        
        barContainer.appendChild(bar);
        
        // Add value label if enabled
        if (this.config.enableValueLabels && height > 5) {
            const label = document.createElement('a-text');
            label.setAttribute('value', value.toString());
            label.setAttribute('position', {
                x: this.scales.x(colIndex),
                y: height + 1,
                z: this.scales.z(rowIndex)
            });
            label.setAttribute('align', 'center');
            label.setAttribute('color', '#ffffff');
            label.setAttribute('scale', '0.8 0.8 0.8');
            label.setAttribute('material', {
                transparent: true,
                opacity: 0.9
            });
            label.className = 'bar-label';
            
            barContainer.appendChild(label);
        }
        
        return barContainer;
    }
    
    animateBarsIn() {
        this.bars.forEach((barContainer, index) => {
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
            
            // Hide label initially
            const label = barContainer.querySelector('.bar-label');
            if (label) {
                label.setAttribute('material', { opacity: 0 });
            }
            
            // Animate to full height
            setTimeout(() => {
                bar.setAttribute('animation__grow', {
                    property: 'height',
                    to: originalHeight,
                    dur: this.animationDuration,
                    easing: 'easeOutCubic'
                });
                
                bar.setAttribute('animation__rise', {
                    property: 'position',
                    to: `${bar.getAttribute('position').x} ${originalY} ${bar.getAttribute('position').z}`,
                    dur: this.animationDuration,
                    easing: 'easeOutCubic'
                });
                
                // Fade in label
                if (label) {
                    setTimeout(() => {
                        label.setAttribute('animation__fadeIn', {
                            property: 'material.opacity',
                            to: 0.9,
                            dur: 500,
                            easing: 'easeOutCubic'
                        });
                    }, this.animationDuration * 0.7);
                }
            }, index * 30); // Faster stagger for more bars
        });
    }
    
    setupInteractions() {
        // Bar selection
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('bar')) {
                this.selectBar(event.target);
            }
        });
        
        // Hover effects
        document.addEventListener('mouseenter', (event) => {
            if (event.target.classList.contains('bar')) {
                this.highlightBar(event.target);
            }
        });
        
        document.addEventListener('mouseleave', (event) => {
            if (event.target.classList.contains('bar')) {
                this.unhighlightBar(event.target);
            }
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardControls(event);
        });
        
        // VR controller events
        document.addEventListener('controllerconnected', (event) => {
            console.log('VR controller connected:', event.detail);
        });
        
        // Add touch support for mobile VR
        document.addEventListener('touchstart', (event) => {
            if (event.target.classList.contains('bar')) {
                this.selectBar(event.target);
            }
        });
    }
    
    selectBar(bar) {
        // Deselect previous bar
        if (this.selectedBar) {
            this.selectedBar.setAttribute('material', {
                color: this.scales.color(parseFloat(this.selectedBar.getAttribute('data-value'))),
                metalness: 0.4,
                roughness: 0.3,
                emissiveIntensity: 0
            });
        }
        
        // Select new bar
        this.selectedBar = bar;
        bar.setAttribute('material', {
            color: '#ff6b6b',
            metalness: 0.8,
            roughness: 0.2,
            emissive: '#ff6b6b',
            emissiveIntensity: 0.4
        });
        
        // Show bar info
        this.showBarInfo(bar);
        
        // Add selection animation
        bar.setAttribute('animation__select', {
            property: 'scale',
            to: '1.2 1.2 1.2',
            dur: 200,
            easing: 'easeOutCubic'
        });
        
        setTimeout(() => {
            bar.setAttribute('animation__select', {
                property: 'scale',
                to: '1 1 1',
                dur: 200,
                easing: 'easeOutCubic'
            });
        }, 200);
    }
    
    highlightBar(bar) {
        if (bar !== this.selectedBar) {
            bar.setAttribute('material', {
                color: '#4ecdc4',
                metalness: 0.6,
                roughness: 0.3,
                emissive: '#4ecdc4',
                emissiveIntensity: 0.3
            });
        }
    }
    
    unhighlightBar(bar) {
        if (bar !== this.selectedBar) {
            bar.setAttribute('material', {
                color: this.scales.color(parseFloat(bar.getAttribute('data-value'))),
                metalness: 0.4,
                roughness: 0.3,
                emissiveIntensity: 0
            });
        }
    }
    
    showBarInfo(bar) {
        const value = bar.getAttribute('data-value');
        const row = parseInt(bar.getAttribute('data-row'));
        const col = parseInt(bar.getAttribute('data-col'));
        
        // Get meaningful labels
        const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Beauty', 'Toys', 'Food', 'Automotive', 'Health', 'Garden', 'Office', 'Jewelry', 'Pet', 'Music', 'Art'];
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'];
        const years = ['2022', '2022', '2022', '2022', '2023', '2023', '2023', '2023', '2024', '2024', '2024', '2024'];
        
        const category = categories[row];
        const quarter = quarters[col];
        const year = years[col];
        
        // Create info panel
        const infoPanel = document.createElement('a-entity');
        infoPanel.setAttribute('position', {
            x: parseFloat(bar.getAttribute('position').x) + 4,
            y: parseFloat(bar.getAttribute('position').y) + 2,
            z: parseFloat(bar.getAttribute('position').z)
        });
        
        const background = document.createElement('a-plane');
        background.setAttribute('width', 5);
        background.setAttribute('height', 2.5);
        background.setAttribute('color', '#000000');
        background.setAttribute('material', {
            transparent: true,
            opacity: 0.9
        });
        infoPanel.appendChild(background);
        
        const text = document.createElement('a-text');
        text.setAttribute('value', `${category}\n${quarter} ${year}\nSales: $${value}K`);
        text.setAttribute('position', '0 0 0.01');
        text.setAttribute('align', 'center');
        text.setAttribute('color', '#ffffff');
        text.setAttribute('scale', '0.6 0.6 0.6');
        infoPanel.appendChild(text);
        
        // Remove previous info panel
        const existingPanel = document.querySelector('.info-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        infoPanel.className = 'info-panel';
        document.getElementById('interactiveElements').appendChild(infoPanel);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (infoPanel.parentNode) {
                infoPanel.remove();
            }
        }, 3000);
    }
    
    handleKeyboardControls(event) {
        const camera = document.getElementById('cameraRig');
        const position = camera.getAttribute('position');
        const speed = 2;
        
        switch(event.key.toLowerCase()) {
            case 'w':
                camera.setAttribute('position', {
                    x: position.x,
                    y: position.y,
                    z: position.z - speed
                });
                break;
            case 's':
                camera.setAttribute('position', {
                    x: position.x,
                    y: position.y,
                    z: position.z + speed
                });
                break;
            case 'a':
                camera.setAttribute('position', {
                    x: position.x - speed,
                    y: position.y,
                    z: position.z
                });
                break;
            case 'd':
                camera.setAttribute('position', {
                    x: position.x + speed,
                    y: position.y,
                    z: position.z
                });
                break;
            case 'q':
                camera.setAttribute('position', {
                    x: position.x,
                    y: position.y + speed,
                    z: position.z
                });
                break;
            case 'e':
                camera.setAttribute('position', {
                    x: position.x,
                    y: position.y - speed,
                    z: position.z
                });
                break;
            case 'r':
                this.resetCamera();
                break;
        }
    }
    
    resetCamera() {
        const camera = document.getElementById('cameraRig');
        camera.setAttribute('position', '0 20 60');
        camera.setAttribute('rotation', '0 0 0');
    }
    
    updateUI() {
        const mainBars = this.flatData.length;
        const clusterBars = this.config.enableClustering ? 6 * 16 : 0; // 6 clusters * 16 bars each
        const totalBars = mainBars + clusterBars;
        
        document.getElementById('matrixSize').textContent = `${this.data.length} × ${this.data[0].length}`;
        document.getElementById('totalBars').textContent = totalBars;
        document.getElementById('maxValue').textContent = Math.max(...this.flatData);
        document.getElementById('minValue').textContent = Math.min(...this.flatData);
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
        this.isLoading = false;
    }
    
    showError(message) {
        const loading = document.getElementById('loading');
        loading.innerHTML = `
            <div class="title">Error</div>
            <div class="subtitle">${message}</div>
        `;
    }
    
    // Performance optimization
    optimizePerformance() {
        // Level of Detail (LOD) based on distance
        const camera = document.getElementById('camera');
        const bars = document.querySelectorAll('.bar');
        
        bars.forEach(bar => {
            const distance = this.getDistance(camera, bar);
            
            if (distance > 50) {
                bar.setAttribute('material', {
                    color: bar.getAttribute('material').color,
                    transparent: true,
                    opacity: 0.5
                });
            } else {
                bar.setAttribute('material', {
                    color: bar.getAttribute('material').color,
                    transparent: true,
                    opacity: 0.9
                });
            }
        });
    }
    
    getDistance(obj1, obj2) {
        const pos1 = obj1.getAttribute('position');
        const pos2 = obj2.getAttribute('position');
        
        return Math.sqrt(
            Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2) +
            Math.pow(pos1.z - pos2.z, 2)
        );
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for WebXR support
    if (navigator.xr) {
        navigator.xr.isSessionSupported('immersive-vr').then(supported => {
            if (supported) {
                console.log('WebXR VR is supported');
            } else {
                console.log('WebXR VR is not supported, using desktop mode');
            }
        });
    }
    
    // Initialize the 3D Bar Chart VR application
    const app = new BarChartVR();
    
    // Performance optimization loop
    setInterval(() => {
        if (!app.isLoading) {
            app.optimizePerformance();
        }
    }, 1000);
    
    // Make app globally accessible for debugging
    window.barChartVR = app;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BarChartVR;
}