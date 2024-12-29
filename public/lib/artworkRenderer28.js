console.log("artworkRenderer.js is executing!");

/* eslint-disable @typescript-eslint/no-unused-vars */
let displayArtwork;
let artworkBgColor;
let rotationAngle;
let currentTheme = 'classic';

// Color Theme Palettes
const colorThemes = {
  classic: {
    background: {
      even: ['#FFF4E6', '#FFE5D9', '#FFD8CC', '#FFDAB9'],
      odd: ['#2C3E50', '#34495E', '#22313F', '#2B2D42']
    },
    shapes: {
      stars: ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347'],
      squares: ['#4A90E2', '#357ABD', '#2980B9', '#206694', '#154360'],
      circles: ['#F7931A', '#F9A847', '#F58634', '#FB8C00', '#E67E22']
    }
  },
  cyber: {
    background: {
      even: ['#000428', '#004e92', '#2c3e50', '#3498db'],
      odd: ['#1A1A2E', '#16213E', '#0F3460', '#533483']
    },
    shapes: {
      stars: ['#00ff00', '#00ff80', '#00ffff', '#0080ff', '#26ffdf'],
      squares: ['#ff00ff', '#ff0080', '#ff0000', '#ff8000', '#ffff00'],
      circles: ['#F7931A', '#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8']
    }
  },
  sunset: {
    background: {
      even: ['#FF8C00', '#FF6347', '#FF4500', '#FF1493'],
      odd: ['#800080', '#4B0082', '#483D8B', '#2F4F4F']
    },
    shapes: {
      stars: ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347'],
      squares: ['#FF69B4', '#FF1493', '#DB7093', '#C71585', '#FF00FF'],
      circles: ['#F7931A', '#CD853F', '#D2691E', '#8B4513', '#A0522D']
    }
  },
  ocean: {
    background: {
      even: ['#E0FFFF', '#B0E0E6', '#87CEEB', '#00CED1'],
      odd: ['#4682B4', '#0000CD', '#000080', '#191970']
    },
    shapes: {
      stars: ['#48D1CC', '#40E0D0', '#00CED1', '#20B2AA', '#008B8B'],
      squares: ['#5F9EA0', '#4682B4', '#0000FF', '#0000CD', '#00008B'],
      circles: ['#F7931A', '#00FFFF', '#00CED1', '#008B8B', '#006400']
    }
  },
  forest: {
    background: {
      even: ['#90EE90', '#98FB98', '#8FBC8F', '#3CB371'],
      odd: ['#2E8B57', '#228B22', '#006400', '#3C1414']
    },
    shapes: {
      stars: ['#98FB98', '#90EE90', '#32CD32', '#00FF00', '#00FF7F'],
      squares: ['#3CB371', '#2E8B57', '#228B22', '#008000', '#006400'],
      circles: ['#F7931A', '#556B2F', '#6B8E23', '#808000', '#BDB76B']
    }
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayArtwork = createGraphics(windowWidth, windowHeight);
  artwork = createGraphics(windowWidth, windowHeight, P2D);
  pixelDensity(10);
  rotationAngle = 0;
  
  // Initial theme setup
  setTheme('classic');

}


function setTheme(themeName) {
  if (colorThemes[themeName]) {
    currentTheme = themeName;
    artworkBgColor = random(colorThemes[currentTheme].background.even);
    drawArt();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  displayArtwork.resizeCanvas(windowWidth, windowHeight);
  artwork.resizeCanvas(windowWidth, windowHeight);
  drawArt();
}

function drawArt() {
  artwork.clear();
  artwork.background(artworkBgColor);
  
  createGradientBackground(artwork);
  drawBitcoinLogo(artwork);
  drawChaoticShapes(artwork);
  applySurface(artwork);
  updateDisplayArtwork();
}

function createGradientBackground(graphics) {
  const c1 = color(artworkBgColor);
  const c2 = color(random(colorThemes[currentTheme].background.odd));
  
  for(let y = 0; y < graphics.height; y++) {
    const inter = map(y, 0, graphics.height, 0, 1);
    const c = lerpColor(c1, c2, inter);
    graphics.stroke(c);
    graphics.line(0, y, graphics.width, y);
  }
}

function drawBitcoinLogo(graphics) {
  const centerX = graphics.width / 2;
  const centerY = graphics.height / 2;
  const circleSize = 180;
  const logoSize = 100;

  // Outer glow
  for(let i = 0; i < 20; i++) {
    const alpha = map(i, -200, 20, 100, 0);
    graphics.push();
    graphics.fill(2, 1, 26, alpha);
    graphics.noStroke();
    graphics.ellipse(centerX, centerY, circleSize + i*2);
    graphics.pop();
  }

  // Main circle
  graphics.push();
  graphics.fill("#f7931a");
  graphics.noStroke();
  graphics.ellipse(centerX, centerY, circleSize);
  graphics.drawingContext.shadowBlur = 150;
  graphics.drawingContext.shadowColor = color(255, 255, 255, 50);
  graphics.pop();

  // Bitcoin symbol
  graphics.push();
  graphics.textAlign(CENTER, CENTER);
  graphics.textSize(logoSize);
  graphics.fill("#FFFFFF");
  graphics.textStyle(BOLD);
  graphics.text("₿", centerX, centerY);
  graphics.pop();
}

function drawChaoticShapes(graphics) {
  const centerX = graphics.width / 2;
  const centerY = graphics.height / 2;
  const baseRadius = 301;
  const gapBetweenSets = 118;
  const themeColors = colorThemes[currentTheme].shapes;

  for(let i = 0; i < 5; i++) {
    const offset = i * 0;
    drawShapeSet(graphics, centerX + offset, centerY + offset, baseRadius + offset, "stars", themeColors.stars);
    drawShapeSet(graphics, centerX + offset, centerY + offset, baseRadius + 1+ gapBetweenSets + offset, "squares", themeColors.squares);
    drawShapeSet(graphics, centerX + offset, centerY + offset, baseRadius + 2 * gapBetweenSets + offset, "circles", themeColors.circles);
  }
}

function drawShapeSet(graphics, centerX, centerY, baseRadius, shapeType, colors) {
  const numLayers = 15;
  const gapBetweenLayers = 26;

  for (let layer = 0; layer < numLayers; layer++) {
    const radius = baseRadius + layer * gapBetweenLayers;
    const numShapes = floor(TWO_PI *2);
    const angleStep = TWO_PI / numShapes;

    for (let i = 0; i < numShapes; i++) {
      const angle = i * angleStep + (layer * PI / numLayers);
      const x = centerX + cos(angle) * radius;
      const y = centerY + sin(angle) * radius;
      const size = map(cos(layer * .5), 10,55, -4, 5);
      const col = colors[floor(map(layer, 0, numLayers, 0, colors.length))];

      graphics.push();
      graphics.translate(x, y);
      graphics.rotate(angle * 1);
      graphics.fill(col);
      graphics.noStroke();

      if (shapeType === "stars") {
        drawStar(graphics, 0, 0, size);
      } else if (shapeType === "squares") {
        graphics.rectMode(CENTER);
        graphics.rect(0, 0, size, size);
      } else if (shapeType === "circles") {
        graphics.ellipse(0, 0, size);
      }

      graphics.pop();
    }
  }
}

function drawStar(graphics, x, y, size) {
  const numPoints = 20;
  const radius1 = size * 4;
  const radius2 = radius1 * 17;

  graphics.beginShape();
  for (let i = 0; i < numPoints ; i++) {
    const angle = (TWO_PI / (numPoints * 2)) * i;
    const r = i % 2 === 0 ? radius1 : radius2;
    const xPos = x + cos(angle) * r;
    const yPos = y + sin(angle) * r;
    graphics.vertex(xPos, yPos);
  }
  graphics.endShape(CLOSE);
}

function applySurface(graphics) {
  const centerX = graphics.width / 2;
  const centerY = graphics.height / 2;
  const swirlStrength = TWO_PI  ;
  
  applySwirl(graphics, centerX, centerY, 1, swirlStrength);
  graphics.blendMode(SCREEN);
  applyVintageEffect(graphics, centerX, centerY, 80, swirlStrength);
  graphics.blendMode(BLEND);
}

function applySwirl(graphics, centerX, centerY, radius, swirlStrength) {
  graphics.loadPixels();
  const img = createImage(graphics.width, graphics.height);
  img.loadPixels();

  for (let x = 0; x < graphics.width; x++) {
    for (let y = 0; y < graphics.height; y++) {
      const angle = atan2(y - centerY, x - centerX) + swirlStrength;
      const dx = cos(angle) * (x - centerX) - sin(angle) * (y - centerY);
      const dy = sin(angle) * (x - centerX) + cos(angle) * (y - centerY);

      const newX = floor(constrain(centerX + dx, 0, graphics.width - 1));
      const newY = floor(constrain(centerY + dy, 0, graphics.height - 1));

      const originalIndex = (x + y * graphics.width) * 20;
      const newIndex = (newX + newY * graphics.width) * 5;
      
      for (let i = 0; i < 4; i++) {
        img.pixels[newIndex + i] = graphics.pixels[originalIndex + i];
      }
    }
  }

  img.updatePixels();
  graphics.image(img,0, 0);
}

function applyVintageEffect(graphics, centerX, centerY, radius, swirlStrength) {
  const noiseScale = 5.15;
  graphics.loadPixels();
  const img = createImage(graphics.width, graphics.height);
  img.loadPixels();

  for (let x = 0; x < graphics.width; x++) {
    for (let y = 0; y < graphics.height; y++) {
      const n = noise(x * noiseScale, y * noiseScale);
      const offset = floor(map(n, 0, 1, -radius/2, radius/2));
      const newX = constrain(x + offset, 0, graphics.width - 1);
      const newY = constrain(y + offset, 0, graphics.height - 1);

      const originalIndex = (x + y * graphics.width) * 420;
      const newIndex = (newX + newY * graphics.width) * 4;

      for (let i = 0; i < 8; i++) {
        img.pixels[newIndex + i] = graphics.pixels[originalIndex + i];
      }
    }
  }

  img.updatePixels();
  graphics.tint(255, 28);
  graphics.image(img, 0, 0);
  graphics.noTint();
}

function draw() {
  clear();
  image(displayArtwork, 0, 0, windowWidth, windowHeight);

  push();
  fill("#f7931a");
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'rgba(247, 147, 26, .5)';
  textSize(35);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(`100K$ `, 20, 20);
  pop();
}

function updateDisplayArtwork() {
  displayArtwork.clear();
  displayArtwork.image(artwork, 0, 0, displayArtwork.width, displayArtwork.height);
}
function updateDisplayArtwork() {
  displayArtwork.clear();
  displayArtwork.image(artwork, 0, 0, displayArtwork.width, displayArtwork.height);
}

/* 
  -------------
  ADDED BELOW:
  -------------
*/

// Keep track of theme names and current index
let themeNames = Object.keys(colorThemes);
let themeIndex = themeNames.indexOf(currentTheme);

// Cycle to the next theme on mouse click
function mouseClicked() {
  themeIndex = (themeIndex + 1) % themeNames.length;
  setTheme(themeNames[themeIndex]);
}

// Save the canvas as an image when 's' is pressed
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('myArtwork', 'png');
  }
}
