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

  /**
   * Main constructor of the LSystem.
   * @param {Array} symbols is a set of symbols, represented by characters.
   * @param {Array} rules is a set of rules, see "Rule" class.
   * @param {String} axiom is the ground truth and acts as the starting point for the System.
   */
  constructor(symbols, rules, axiom) {
    this.symbols = symbols;
    this.rules = rules;
    this.axiom = axiom;
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
   * @param {Rule} rule
   */
  addRule(rule) {
    this.rules.push(rule);
  }

  /**
   * Changes the given axiom to the given axiom. If the axiom is invalid (consiting of symbols that aren't in the symbol set) the
   * axiom remains unchanged.
   * @param {String} axiom
   */
  changeAxiom(axiom) {
    if ("Axiom is invalid") {
      return false;
    }
    this.axiom = axiom;
    return true;
  }
}

/**
 * A LRule is a Rule used by a Lindemayer-System.
 * The form is:
 *      Symbol => Symbol(s), e.g.: A => AB
 */
class LRule {}
