/**
 * This is a representation of an LSystem.
 * It contains 3 main components:
 *  1. Rule Set
 *  2. Symbol Set
 *  3. Axiom
 *
 * -- Write something about the interpretation of an LSystem --
 */
class LSystem {
  symbols;
  rules;
  axiom;
  generationNumber;

  /**
   * Main constructor of the LSystem.
   * @param {Array} symbols is a set of symbols, represented by characters.
   * @param {LRule[]} rules is a set of rules, see "Rule" class.
   * @param {String} axiom is the ground truth and acts as the starting point for the System.
   */
  constructor(symbols, rules, axiom) {
    this.symbols = symbols;
    this.rules = rules;
    this.axiom = axiom;
    this.generationNumber = 0;
  }

  /**
   * Empty System constructor.
   * @returns an empty LSystem (no symbols, no rules, no axiom)
   */
  static emptySystem() {
    var symbols = [];
    var rules = [];
    var axiom = "";
    return new LSystem(symbols, rules, axiom);
  }

  /**
   * Adds a new Symbol to the symbol set.
   * @param {String} symbol
   */
  addSymbol(symbol) {
    this.symbols.push(symbol);
  }

  /**
   * Adds a new Rule to the rule set. If the Rule already exists in the rule set, it remains unchanged.
   * @param {LRule} rule
   */
  addRule(rule) {
    for (let i = 0; i < this.rules.length; i++) {
      if (this.rules[i].equals(rule)) {
        return;
      }
    }
    this.rules.push(rule);
  }

  /**
   * Changes the axiom to the given axiom. If the axiom is invalid (consiting of symbols that aren't in the symbol set) the
   * axiom remains unchanged.
   * @param {String} axiom
   */
  changeAxiom(axiom) {
    for (let i = 0; i < axiom.length; i++) {
      if (this.symbols.find((elem) => elem == axiom[i]) == undefined) {
        return false;
      }
    }
    this.axiom = axiom;
    return true;
  }

  /**
   * Evolves the axiom into its next generation. If no applicable rule is found for a symbol, the identity rule (A => A)
   * will be applied.
   */
  evolve() {
    let newAxiom = "";
    let ruleFound;
    for (let i = 0; i < this.axiom.length; i++) {
      ruleFound = false;
      for (let j = 0; j < this.rules.length; j++) {
        if (this.axiom[i] == this.rules[j].getPred()) {
          newAxiom += this.rules[j].getSucc();
        }
      }
      if (!ruleFound) {
        newAxiom += this.axiom[i];
      }
    }
    this.axiom = newAxiom;
    this.generationNumber++;
  }

  /**
   * Returns the current evolution state.
   * @returns the current generation.
   */
  getCurrentGeneration() {
    return this.axiom;
  }

  getGenerationAsNumber() {
    return this.generationNumber;
  }
}

/**
 * A LRule is a Rule used by a Lindenmayer-System.
 * The form is:
 *      Symbol => Symbol(s), e.g.: A => AB
 */
class LRule {
  predecessor;
  successor;

  /**
   * LRule constructor. It takes two Strings representing the rule.
   * @param {String} predecessor
   * @param {String} successor
   */
  constructor(predecessor, successor) {
    this.predecessor = predecessor;
    this.successor = successor;
  }

  /**
   * Getter for successor.
   * @returns the successor of this LRule.
   */
  getSucc() {
    return this.successor;
  }

  /**
   * Getter for predecessor.
   * @returns the predecessor of this LRule.
   */
  getPred() {
    return this.predecessor;
  }

  /**
   * Creates a string representation of this rule.
   * @returns a string representing this rule in the form of (predecessor => successor)
   */
  toString() {
    return this.predecessor.toString + " => " + this.successor.toString;
  }

  /**
   * Checks if the given rule is equal to this rule.
   * @param {LRule} otherRule
   */
  equals(otherRule) {
    return (
      this.predecessor == otherRule.predecessor &&
      this.successor == otherRule.successor
    );
  }
}

/**
 * The Interpreter allows the assignment of meaning to a LSystem. An LSystem just produces a new word with each
 * generation. Therefore it is necessary to define what a symbol means, if output should be generated.
 */
class LInterpreter {
  lSystem;
  meaningFunction;

  /**
   * Constructor for the LInterpreter.
   * @param {LSystem} lSystem is the system that meaning should be applied to.
   * @param {Function} meaningFunction is a function that can produce output(text, graphics, etc.) based on the
   *                                   generations of the LSystem. The meaning function has to be able to
   *                                   interpret all occuring symbols and/or handle unknown symbols.
   */
  constructor(lSystem, meaningFunction) {
    this.lSystem = lSystem;
    this.meaningFunction = meaningFunction;
  }

  /**
   * Gatheres the current generation of the LSystem and applied the meaning function to it.
   */
  interpret() {
    let currentGeneration = this.lSystem.getCurrentGeneration();
    this.lSystem.evolve();
    this.meaningFunction(currentGeneration);
  }
}
