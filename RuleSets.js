/**
 * @author Christoph Bader
 * @date 28.01.2023
 */

/**
 * Sources:
 * Great overview over different systems: https://www.houdinikitchen.net/2019/12/21/how-to-create-l-systems/#advgb-toc-2852cf93-4f44-43d7-a9c3-0e53ab1d16fb
 * Book about plant algorithms: http://algorithmicbotany.org/papers/abop/abop.pdf
 */

// -----------------------------------------------------------------
// SIMPLE SYSTEMS
// -----------------------------------------------------------------

/**
 * Setup for the ball system.
 */
function setUpBallSystem() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, ballSystemMeaningFunction);

  // Define Symbols
  system.addSymbol("A");
  system.addSymbol("B");
  system.addSymbol("C");

  // Define Rules
  let r1 = new LRule("A", "AB");
  let r2 = new LRule("B", "BC");
  let r3 = new LRule("C", "AC");

  // Set Rules
  system.addRule(r1);
  system.addRule(r2);
  system.addRule(r3);

  // Set Axiom
  system.changeAxiom("A");

  return system;
}

/**
 * Gives meaning to the given BallSystem generation.
 * @param {String} generation represents the current generation.
 */
function ballSystemMeaningFunction(generation) {
  push();
  noStroke();
  fill(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "A":
        translate(10, 10);
        break;
      case "B":
        translate(10, -10);
        break;
      case "C":
        circle(0, 0, 10);
        break;
      default:
        break;
    }
  }
  pop();
}

/**
 * Setup for the tree system.
 */
function setUpTreeSystem() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, treeSystemMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("X");
  system.addSymbol("-");
  system.addSymbol("+");
  system.addSymbol("[");
  system.addSymbol("]");

  // Define Rules
  let r1 = new LRule("F", "F");
  let r2 = new LRule("X", "F-[[X]+X]+F[+FX]-X");

  // Set Rules
  system.addRule(r1);
  system.addRule(r2);

  // Set Axiom
  system.changeAxiom("X");

  return system;
}

/**
 * Gives meaning to the given TreeSystem generation
 * @param {String} generation represents the current generation.
 */
function treeSystemMeaningFunction(generation) {
  // Rotation angle
  let angle = 22;
  let lineLength = 5;
  push();
  strokeWeight(1);
  fill(0);
  translate(width / 2, height);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        lineLength = lineLength * 0.9991;
        break;
      case "X":
        // Placeholder for recursion.
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
  pop();
}

// -----------------------------------------------------------------
// EDGE REWRITING
// -----------------------------------------------------------------

/**
 * Setup function for quadratic Koch curve.
 * @returns a quadratic koch LSystem.
 */
function setUpQuadraticKoch() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, QuadraticKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("-");
  system.addSymbol("+");

  // Define Rules
  let r1 = new LRule("F", "F+FF-FF-F-F+F+FF-F-F+F+FF+FF-F");

  // Set Rules
  system.addRule(r1);

  // Set Axiom
  system.changeAxiom("F-F-F-F");

  return system;
}

/**
 * Gives meaning to the given Quadratic-Koch-Curve generation.
 * @param {String} generation represents the current generation.
 */
function QuadraticKochMeaningFunction(generation) {
  // Rotation angle
  let angle = 90;
  let lineLength = 5;
  push();
  strokeWeight(1);
  fill(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      default:
        break;
    }
  }
  pop();
}

/**
 * Setup for a contained koch system.
 * @returns a contained koch curve system.
 */
function setUpcontainedKoch() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, containedKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("-");

  // Define Rules
  let r1 = new LRule("F", "FF-F-F-F-FF");

  // Set Rules
  system.addRule(r1);

  // Set Axiom
  system.changeAxiom("F-F-F-F");

  return system;
}

/**
 * Gives meaning to the contained koch curve system.
 * @param {String} generation represents the current generation.
 */
function containedKochMeaningFunction(generation) {
  let angle = 90;
  let lineLength = 10;
  push();
  strokeWeight(1);
  fill(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "-":
        rotate(radians(-angle));
        break;
      default:
        break;
    }
  }
  pop();
}

// -----------------------------------------------------------------
// Branching Structures
// -----------------------------------------------------------------

function setUpBranchA() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, containedKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("-");
  system.addSymbol("+");
  system.addSymbol("[");
  system.addSymbol("]");

  // Define Rules
  let r1 = new LRule("F", "F[+F]F[-F]F");

  // Set Rules
  system.addRule(r1);

  // Set Axiom
  system.changeAxiom("F");

  return system;
}

function meaningFunctionBranchA(generation) {
  // Rotation angle
  let angle = 25.7;
  let lineLength = 0.33;
  push();
  strokeWeight(1);
  stroke(14, 43, 20, 50);
  translate(width * 0.25, height / 2);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
  pop();
}

function setUpBranchB() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, containedKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("-");
  system.addSymbol("+");
  system.addSymbol("[");
  system.addSymbol("]");

  // Define Rules
  let r1 = new LRule("F", "F[+F]F[-F][F]");

  // Set Rules
  system.addRule(r1);

  // Set Axiom
  system.changeAxiom("F");

  return system;
}

function meaningFunctionBranchB(generation) {
  // Rotation angle
  let angle = 20.0;
  let lineLength = 1.5;
  push();
  strokeWeight(1);
  stroke(14, 43, 20, 50);
  translate(width / 2, height / 2);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
  pop();
}

function setUpBranchC() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, containedKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("-");
  system.addSymbol("+");
  system.addSymbol("[");
  system.addSymbol("]");

  // Define Rules
  let r1 = new LRule("F", "FF-[-F+F+F]+[+F-F-F]");

  // Set Rules
  system.addRule(r1);

  // Set Axiom
  system.changeAxiom("F");

  return system;
}

function meaningFunctionBranchC(generation) {
  // Rotation angle
  let angle = 22.5;
  let lineLength = 1;
  push();
  strokeWeight(1);
  stroke(14, 43, 20, 50);
  translate(width * 0.75, height / 2);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
  pop();
}

function setUpBranchD() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, containedKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("X");
  system.addSymbol("-");
  system.addSymbol("+");
  system.addSymbol("[");
  system.addSymbol("]");

  // Define Rules
  let r1 = new LRule("X", "F[+X]F[-X]+X");
  let r2 = new LRule("F", "FF");

  // Set Rules
  system.addRule(r1);
  system.addRule(r2);

  // Set Axiom
  system.changeAxiom("X");

  return system;
}

function meaningFunctionBranchD(generation) {
  // Rotation angle
  let angle = 20;
  let lineLength = 0.5;
  push();
  strokeWeight(1);
  stroke(14, 43, 20, 50);
  translate(width * 0.25, height);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "X":
        // Placeholder for recursion
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
  pop();
}

function setUpBranchE() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, containedKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("X");
  system.addSymbol("-");
  system.addSymbol("+");
  system.addSymbol("[");
  system.addSymbol("]");

  // Define Rules
  let r1 = new LRule("X", "F[+X][-X]FX");
  let r2 = new LRule("F", "FF");

  // Set Rules
  system.addRule(r1);
  system.addRule(r2);

  // Set Axiom
  system.changeAxiom("X");

  return system;
}

function meaningFunctionBranchE(generation) {
  // Rotation angle
  let angle = 25.7;
  let lineLength = 0.33;
  push();
  strokeWeight(1);
  stroke(14, 43, 20, 50);
  translate(width * 0.5, height);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "X":
        // Placeholder for recursion
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
  pop();
}

function setUpBranchF() {
  // Define System and Interpreter
  let system = LSystem.emptySystem();
  interpreter = new LInterpreter(lSystem, containedKochMeaningFunction);

  // Define Symbols
  system.addSymbol("F");
  system.addSymbol("X");
  system.addSymbol("-");
  system.addSymbol("+");
  system.addSymbol("[");
  system.addSymbol("]");

  // Define Rules
  let r1 = new LRule("X", "F-[[X]+X]+F[+FX]-X");
  let r2 = new LRule("F", "FF");

  // Set Rules
  system.addRule(r1);
  system.addRule(r2);

  // Set Axiom
  system.changeAxiom("X");

  return system;
}

function meaningFunctionBranchF(generation) {
  // Rotation angle
  let angle = 22.5;
  let lineLength = 0.4;
  push();
  strokeWeight(1);
  stroke(14, 43, 20, 50);
  translate(width * 0.75, height);
  for (let i = 0; i < generation.length; i++) {
    switch (generation[i]) {
      case "F":
        line(0, 0, 0, -lineLength);
        translate(0, -lineLength);
        break;
      case "X":
        // Placeholder for recursion
        break;
      case "-":
        rotate(radians(-angle));
        break;
      case "+":
        rotate(radians(angle));
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
  }
  pop();
}
