# LindenMayer-System

----
## What it does
This is a short implementation to show some base capabilities of Lindenmayer-Systems. <br> 
Lindenmayer-Systems (L-Systems) are used in biology and computer graphics to simulate the <br>
growth of plants and plantlike structures.

I implemented some classes in this sketch to create and show different L-Systems <br>
with a graphical representation. 

## How it works
A L-System consists of 3 main components: 
  <ol>
  <li> A set of symbols. E.g.: [A,B,C] </li>
  <li> A set of rules. E.g.: [(A => BC), (B => AC)] </li>
  <li> An axiom (or premise). E.g.: "A" </li>
  </ol>

The system evolves and creates new generations using the rule set and starting from the axiom. <br>
That means, that with each generation the rules are applied and therefore changing the current generation. <br>

Here's a quick example. Let L be an L-System. <br>
$L = (Symbols, Rules, Axiom) = ([A, B],\ [(A => AB),\ (B => BA)],\ 'A')$

The generations would look like this: 
    <ol>
    <li> $A$ </li>
    <li> $AB$ </li>
    <li> $ABBA$ </li>
    <li> $ABBABAAB$ </li>
    <li> and so on... </li>
    </ol>

## How to run it
Still in progress, it is runnable by hosting the sketch locally. But I will implement it on my website soon.

## What I've learned
I used the **First-Class Functions** principle to create assign a meaning function to a system using the <br>
created LInterpreter class. As I'm just learning Javascript I also learned how JavaScript handles **Classes** and <br>
**Constructors**.

## Result
![alt text](https://github.com/ChrisBaderDev/LindenMayer-System/Images/ResultImage.jpg?raw=true)
    
