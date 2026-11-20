// AP-style practice questions, four per topic.
// Written to match the style of the AP Computer Science A exam (Java code stimulus, four choices,
// "What is printed as a result of executing the code segment?").
// All code and scenarios are original. Nothing is copied from College Board materials.
// st: optional stimulus (Java code), q: question, a: choices, c: correct index, why: explanation
window.AP_QUESTIONS = {
  // ---------- Unit 1: Using Objects and Methods ----------
  '1.1': [
    { q: 'Which of the following best describes what the Java compiler does?', a: ['It runs the program one line at a time and shows the output', 'It checks the source code for syntax errors and translates it into bytecode', 'It finds every logic error in a program', 'It stores the program on the internet'], c: 1, why: 'The compiler checks syntax and produces bytecode for the Java Virtual Machine. It cannot find logic errors.' },
    { st: `int total = 10
System.out.println(total);`, q: 'Which of the following best describes the error in this code segment?', a: ['A syntax error, because the first line is missing a semicolon', 'A logic error, because total should be 0', 'An exception, because total is printed', 'There is no error'], c: 0, why: 'Every Java statement ends with a semicolon. The compiler reports a syntax error.' },
    { st: `int a = 8;
int b = 0;
System.out.println(a / b);`, q: 'What happens when this code segment is run?', a: ['It prints 0', 'It prints 8', 'It compiles, then throws an ArithmeticException while running', 'It does not compile'], c: 2, why: 'Dividing an int by zero is legal syntax, so it compiles, but it throws an ArithmeticException at run time.' },
    { q: 'A program to find the average of three test scores compiles and runs, but always prints a value that is too large. What kind of error is this?', a: ['Syntax error', 'Logic error', 'Compiler error', 'Exception'], c: 1, why: 'The program runs but gives the wrong answer, which is a logic error.' }
  ],
  '1.2': [
    { q: 'Which data type is the best choice for storing whether a student has turned in homework?', a: ['int', 'double', 'boolean', 'String'], c: 2, why: 'There are only two possibilities, turned in or not, so boolean fits best.' },
    { q: 'Which data type is the best choice for storing the price of a movie ticket, such as 12.75?', a: ['int', 'double', 'boolean', 'char'], c: 1, why: 'A price has a decimal part, so double is the right type.' },
    { q: 'Which of the following is a reference type?', a: ['int', 'double', 'boolean', 'String'], c: 3, why: 'String is a class. Its variables hold a reference to a String object.' },
    { q: 'Which of the following correctly declares an int variable named count and sets it to 5?', a: ['count int = 5;', 'int count = 5;', 'int = count 5;', 'count = int 5;'], c: 1, why: 'A declaration gives the type, then the name, then an optional starting value.' }
  ],
  '1.3': [
    { st: `System.out.println(17 / 5);
System.out.println(17 % 5);`, q: 'What is printed as a result of executing the code segment?', a: ['3.4 then 2', '3 then 2', '3 then 3', '3.4 then 0.4'], c: 1, why: '17 / 5 is integer division, which gives 3. The remainder 17 % 5 is 2.' },
    { q: 'What is the value of the expression 2 + 3 * 4 - 6 / 2 ?', a: ['11', '7', '17', '14'], c: 0, why: 'Multiply and divide first: 3 * 4 = 12 and 6 / 2 = 3. Then 2 + 12 - 3 = 11.' },
    { st: `System.out.print("A");
System.out.println("B");
System.out.print("C");`, q: 'What is printed?', a: ['A B C each on its own line', 'AB on one line, then C on the next line', 'ABC on one line', 'A on one line, then BC on the next line'], c: 1, why: 'print stays on the line, println ends the line after B, and C starts a new line.' },
    { q: 'What is the value of 9 / 2.0 ?', a: ['4', '4.5', '4.0', '5'], c: 1, why: 'One operand is a double, so the division is done with decimals: 4.5.' }
  ],
  '1.4': [
    { st: `int x = 4;
int y = x + 3;
x = y * 2;
y = x - y;`, q: 'What are the values of x and y after this code segment runs?', a: ['x = 14, y = 7', 'x = 8, y = 7', 'x = 14, y = 10', 'x = 7, y = 14'], c: 0, why: 'y becomes 7, x becomes 14, then y becomes 14 - 7 = 7.' },
    { st: `int a = 3;
int b = 9;
a = b;
b = a;`, q: 'What are the values of a and b after this code runs?', a: ['a = 9, b = 3', 'a = 3, b = 9', 'a = 9, b = 9', 'a = 3, b = 3'], c: 2, why: 'After a = b, a is 9. Then b = a also stores 9. The original 3 is lost. A swap needs a temporary variable.' },
    { q: 'Which statement best describes the meaning of = in Java?', a: ['It checks whether two values are equal', 'It stores the value on the right into the variable on the left', 'It stores the value on the left into the variable on the right', 'It creates a new class'], c: 1, why: '= is the assignment operator. The right side is evaluated and stored on the left.' },
    { q: 'A program uses a Scanner named input. Which call reads a whole number typed by the user?', a: ['input.nextLine()', 'input.nextInt()', 'input.readNumber()', 'input.next(int)'], c: 1, why: 'nextInt reads the next int from the input.' }
  ],
  '1.5': [
    { q: 'What is the value of (int) 7.89 ?', a: ['8', '7', '7.0', '7.9'], c: 1, why: 'Casting to int truncates, cutting off the decimal part without rounding.' },
    { st: `int total = 7;
int count = 2;
double avg = (double) total / count;`, q: 'What value is stored in avg?', a: ['3.0', '3.5', '3', '4.0'], c: 1, why: 'total is cast to 7.0 first, so the division is 7.0 / 2 = 3.5.' },
    { st: `int total = 7;
int count = 2;
double avg = (double) (total / count);`, q: 'What value is stored in avg?', a: ['3.5', '3.0', '4.0', '3'], c: 1, why: 'The integer division total / count = 3 happens first, then it is cast to 3.0.' },
    { q: 'What happens when 1 is added to an int variable that holds Integer.MAX_VALUE?', a: ['The program does not compile', 'The value becomes a double', 'Integer overflow occurs and the value wraps around to a large negative number', 'The value stays the same'], c: 2, why: 'The result is too large for an int, so it overflows and wraps to Integer.MIN_VALUE.' }
  ],
  '1.6': [
    { st: `int n = 10;
n += 4;
n *= 2;
n -= 3;
n /= 5;`, q: 'What is the value of n after this code runs?', a: ['5', '4', '5.0', '25'], c: 0, why: '10 + 4 = 14, 14 * 2 = 28, 28 - 3 = 25, 25 / 5 = 5.' },
    { st: `int k = 7;
k++;
k++;
k--;
k %= 3;`, q: 'What is the value of k after this code runs?', a: ['0', '1', '2', '8'], c: 2, why: 'k goes 8, 9, 8, then 8 % 3 = 2.' },
    { q: 'Which statement is equivalent to score = score - 5; ?', a: ['score =- 5;', 'score -= 5;', 'score--5;', '5 -= score;'], c: 1, why: 'score -= 5 subtracts 5 from score and stores the result.' },
    { st: `int p = 3;
int q = 4;
p += q;
q *= p;`, q: 'What are the values of p and q after this code runs?', a: ['p = 7, q = 28', 'p = 7, q = 12', 'p = 3, q = 12', 'p = 12, q = 7'], c: 0, why: 'p becomes 3 + 4 = 7, then q becomes 4 * 7 = 28.' }
  ],
  '1.7': [
    { q: 'Which of the following best describes an API?', a: ['A list of every bug in a program', 'Documentation that tells how to use classes and methods without seeing how they are written', 'A program that translates Java into bytecode', 'The main method of a program'], c: 1, why: 'An API describes what classes and methods do and how to call them.' },
    { q: 'Which class must be imported before it can be used, because it is not in java.lang?', a: ['String', 'Math', 'Integer', 'ArrayList'], c: 3, why: 'ArrayList is in java.util. String, Math, and Integer are in java.lang, which is available automatically.' },
    { q: 'A student uses Math.sqrt without knowing the steps it uses to find a square root. This is an example of which idea?', a: ['Procedural abstraction', 'Integer overflow', 'Casting', 'Encapsulation of instance variables'], c: 0, why: 'Using a method based on what it does, not how it works, is procedural abstraction.' },
    { q: 'Which of the following is the main benefit of using library classes?', a: ['Programs no longer need testing', 'Programmers can reuse tested code instead of writing everything themselves', 'Library code never has to be compiled', 'Library classes make every program run faster'], c: 1, why: 'Libraries let programmers reuse reliable code and save time.' }
  ],
  '1.8': [
    { q: 'Which of the following is a valid single-line comment in Java?', a: ['# total score', '// total score', '<!-- total score -->', '-- total score'], c: 1, why: 'Java single-line comments begin with //.' },
    { st: `/**
 * Returns the average of the values.
 * Precondition: count > 0
 */
public static double average(int sum, int count)`, q: 'What does the precondition tell a programmer?', a: ['The method will always return a positive number', 'count must be greater than 0 when the method is called, or the method might not work', 'The method sets count to a positive value', 'The method can only be called once'], c: 1, why: 'A precondition must be true before the call. The method does not promise to work otherwise.' },
    { q: 'What is a postcondition?', a: ['A comment placed after the last line of a program', 'A condition guaranteed to be true after a method finishes', 'An error found after the program runs', 'A condition that must be true before a method runs'], c: 1, why: 'Postconditions describe what is true after the method completes.' },
    { q: 'How does the compiler treat comments?', a: ['It runs them as code', 'It ignores them', 'It prints them to the screen', 'It reports them as errors'], c: 1, why: 'Comments are for people. The compiler skips them.' }
  ],
  '1.9': [
    { st: `public static int area(int width, int height)`, q: 'Which of the following is a correct call to this method?', a: ['int a = area(4, 5);', 'int a = area(4);', 'int a = area("4", "5");', 'area(int 4, int 5);'], c: 0, why: 'The call must pass two int arguments in order, and the int result can be stored.' },
    { q: 'Which of the following methods returns no value?', a: ['public int getCount()', 'public void printReport()', 'public double getAverage()', 'public String getName()'], c: 1, why: 'void means the method does an action and returns nothing.' },
    { st: `public static void show(int x) { ... }
public static void show(double x) { ... }
public static void show(int x, int y) { ... }`, q: 'These three methods are an example of which idea?', a: ['Casting', 'Overloading', 'Encapsulation', 'Recursion'], c: 1, why: 'Same name, different parameter lists: that is method overloading.' },
    { q: 'What is the difference between a parameter and an argument?', a: ['There is no difference', 'A parameter is in the method header; an argument is the value passed in the call', 'An argument is in the method header; a parameter is the value passed in the call', 'Parameters are only used in void methods'], c: 1, why: 'The parameter receives the value; the argument is the value sent by the caller.' }
  ],
  '1.10': [
    { q: 'How is a static (class) method called from another class?', a: ['With the class name, a dot, and the method name', 'With the keyword new', 'Only from inside a loop', 'By creating an object first, always'], c: 0, why: 'Static methods are called on the class, like Math.abs(-3).' },
    { st: `public static int triple(int n) { return n * 3; }

int r = triple(triple(2)) + 1;`, q: 'What value is stored in r?', a: ['7', '13', '19', '18'], c: 2, why: 'triple(2) is 6, triple(6) is 18, and 18 + 1 = 19.' },
    { q: 'What is the value of Integer.parseInt("40") + 2 ?', a: ['"402"', '42', '402', '"42"'], c: 1, why: 'parseInt converts "40" to the int 40, then 40 + 2 = 42.' },
    { st: `public static void greet() { System.out.print("Hi"); }`, q: 'Which statement uses this method correctly?', a: ['String s = greet();', 'greet();', 'int x = greet() + 1;', 'System.out.println(greet() * 2);'], c: 1, why: 'greet is void, so it is called as a statement and its result cannot be stored or used.' }
  ],
  '1.11': [
    { q: 'What is the value of Math.pow(2, 3) ?', a: ['6', '8', '8.0', '9.0'], c: 2, why: 'Math.pow returns a double, so 2 to the 3rd is 8.0.' },
    { q: 'What is the value of Math.abs(-7) + Math.sqrt(16) ?', a: ['11.0', '-3.0', '11', '23.0'], c: 0, why: 'Math.abs(-7) is 7 and Math.sqrt(16) is 4.0, so the sum is the double 11.0.' },
    { q: 'Which expression gives a random int from 1 to 6, like rolling a die?', a: ['(int) (Math.random() * 6)', '(int) (Math.random() * 6) + 1', '(int) Math.random() * 6 + 1', '(int) (Math.random() * 7)'], c: 1, why: 'Math.random() * 6 gives 0.0 up to 6.0; casting gives 0 to 5; adding 1 gives 1 to 6.' },
    { q: 'Which values can Math.random() return?', a: ['Any int', '0.0 up to and including 1.0', '0.0 up to but not including 1.0', '1 to 100'], c: 2, why: 'Math.random() returns a double that is at least 0.0 and less than 1.0.' }
  ],
  '1.12': [
    { q: 'Which of the following best describes the relationship between a class and an object?', a: ['A class is an instance of an object', 'An object is a specific instance of a class, which acts as its blueprint', 'They mean exactly the same thing', 'A class can only make one object'], c: 1, why: 'A class is the blueprint; each object is one instance built from it.' },
    { q: 'A Car class has instance variables for color and speed. Two Car objects are created. Which statement is true?', a: ['Both cars must have the same color', 'Each car has its own color and speed', 'Only the first car has a speed', 'The cars share one speed variable'], c: 1, why: 'Each object has its own copy of every instance variable.' },
    { q: 'In a Song class, which of the following would most likely be a behavior?', a: ['title', 'lengthInSeconds', 'play()', 'artist'], c: 2, why: 'Behaviors are actions written as methods. The others are attributes.' },
    { q: 'Which of the following would best be represented as attributes of a BankAccount class?', a: ['deposit and withdraw', 'owner name and balance', 'print and save', 'open and close'], c: 1, why: 'Attributes are data the object holds. Deposit and withdraw are behaviors.' }
  ],
  '1.13': [
    { st: `public class Book {
  public Book(String title, int pages) { ... }
  public Book(String title) { ... }
}`, q: 'Which of the following correctly creates a Book object?', a: ['Book b = Book("Dune", 412);', 'Book b = new Book("Dune", 412);', 'Book b = new Book(412, "Dune");', 'new Book b = ("Dune");'], c: 1, why: 'Objects are created with new and a constructor whose arguments match a parameter list in order.' },
    { st: `Book a = new Book("Hatchet");
Book b = a;`, q: 'Which statement is true after this code runs?', a: ['There are two separate Book objects', 'a and b refer to the same Book object', 'b is null', 'The code does not compile'], c: 1, why: 'b = a copies the reference, so both variables point to one object.' },
    { q: 'What value does a reference variable hold if it does not refer to any object?', a: ['0', 'false', 'null', 'An empty String'], c: 2, why: 'null means the variable does not point to an object.' },
    { q: 'What does a reference variable actually store?', a: ['A copy of every instance variable of the object', 'The location of the object in memory', 'The name of the class', 'The constructor code'], c: 1, why: 'A reference stores where the object is in memory, not the object itself.' }
  ],
  '1.14': [
    { st: `public class Counter {
  private int count;
  public void click() { count++; }
  public int getCount() { return count; }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
c1.click();
c1.click();
c2.click();
System.out.println(c1.getCount() + c2.getCount());`, q: 'What is printed?', a: ['2', '3', '21', '1'], c: 1, why: 'c1 has count 2 and c2 has count 1. Each object keeps its own data, so 2 + 1 = 3.' },
    { st: `Counter c = null;
c.click();`, q: 'What happens when this code runs?', a: ['count becomes 1', 'Nothing happens', 'A NullPointerException is thrown', 'It does not compile'], c: 2, why: 'Calling a method on a null reference throws a NullPointerException.' },
    { q: 'Which of the following is most likely an accessor method?', a: ['setName(String n)', 'getName()', 'addPoints(int p)', 'reset()'], c: 1, why: 'Accessors return information without changing the object, often named get...' },
    { q: 'How is an instance method called?', a: ['Using the class name, like Counter.click()', 'Using an object reference, like c.click()', 'Using the keyword static', 'It cannot be called from outside its class'], c: 1, why: 'Instance methods run on a specific object, so they are called through a reference to it.' }
  ],
  '1.15': [
    { st: `String s = "COMPUTER";
System.out.println(s.substring(3, 6));`, q: 'What is printed?', a: ['PUT', 'MPU', 'PUTE', 'UTE'], c: 0, why: 'Indexes 3, 4, 5 are P, U, T. The end index 6 is not included.' },
    { st: `String s = "banana";
System.out.println(s.indexOf("na") + s.length());`, q: 'What is printed?', a: ['8', '2', '6', '-1'], c: 0, why: '"na" first appears at index 2, and the length is 6, so 2 + 6 = 8.' },
    { st: `String w = "java";
w.toUpperCase();
System.out.println(w);`, q: 'What is printed?', a: ['JAVA', 'java', 'Java', 'Nothing; it throws an exception'], c: 1, why: 'Strings are immutable. toUpperCase returns a new String, but the result was not stored.' },
    { q: 'Which expression correctly checks whether String a has the same characters as String b?', a: ['a == b', 'a.equals(b)', 'a = b', 'a.compareTo(b) == 1'], c: 1, why: 'equals compares contents. == only checks whether the two references are the same object.' }
  ],

  // ---------- Unit 2: Selection and Iteration ----------
  '2.1': [
    { q: 'An algorithm adds every number in a list and then prints the total if it is greater than 100. Which structures does it use?', a: ['Sequencing only', 'Sequencing and selection only', 'Sequencing, selection, and iteration', 'Iteration only'], c: 2, why: 'Steps run in order (sequencing), it repeats for each number (iteration), and it decides whether to print (selection).' },
    { q: 'Which of the following is an example of selection?', a: ['Adding 1 to a counter', 'Printing a message 10 times', 'Charging a lower price if the customer is a student', 'Reading a file line by line'], c: 2, why: 'Selection chooses what to do based on a condition.' },
    { q: 'Why might a programmer write an algorithm in plain words or a flowchart before writing code?', a: ['So the program runs faster', 'To check the logic of the steps before dealing with Java syntax', 'Because Java requires it', 'To avoid using loops'], c: 1, why: 'Planning first helps catch logic problems early.' },
    { q: 'A program must print the numbers 1 to 500. Which structure makes this practical?', a: ['Selection', 'Iteration', 'Casting', 'Commenting'], c: 1, why: 'A loop can repeat the print step 500 times with only a few lines of code.' }
  ],
  '2.2': [
    { st: `int a = 6;
int b = 9;
boolean r = (a + 3 == b);`, q: 'What is the value of r?', a: ['true', 'false', '9', 'The code does not compile'], c: 0, why: 'a + 3 is 9, which equals b, so r is true.' },
    { q: 'Which expression is true when x is not equal to 10?', a: ['x =! 10', 'x != 10', 'x <> 10', '!x == 10'], c: 1, why: '!= is the not-equal operator in Java.' },
    { st: `int n = 15;
System.out.println(n % 2 == 1);`, q: 'What is printed?', a: ['1', 'true', 'false', '7'], c: 1, why: '15 % 2 is 1, so the comparison is true, and println shows true.' },
    { q: 'Which of the following is a Boolean expression?', a: ['x + 5', 'score >= 70', 'name = "Ana"', 'total * 2'], c: 1, why: 'score >= 70 evaluates to true or false.' }
  ],
  '2.3': [
    { st: `int temp = 65;
if (temp > 70) {
  System.out.print("warm ");
}
System.out.print("done");`, q: 'What is printed?', a: ['warm done', 'done', 'warm', 'Nothing'], c: 1, why: '65 > 70 is false, so the if block is skipped, but done is outside the block and always prints.' },
    { st: `int x = 4;
if (x % 2 == 0) {
  x = x * 3;
} else {
  x = x + 1;
}
System.out.println(x);`, q: 'What is printed?', a: ['5', '12', '13', '4'], c: 1, why: '4 is even, so x becomes 12. The else branch does not run.' },
    { st: `int y = 2;
if (y > 5)
  System.out.print("A");
  System.out.print("B");`, q: 'What is printed?', a: ['AB', 'A', 'B', 'Nothing'], c: 2, why: 'Without braces, only the first statement belongs to the if. B prints no matter what, despite the indentation.' },
    { q: 'In an if-else statement, how many of the two blocks run?', a: ['Always both', 'Exactly one', 'Zero or one', 'Zero, one, or two'], c: 1, why: 'Either the condition is true and the if block runs, or it is false and the else block runs.' }
  ],
  '2.4': [
    { st: `int score = 85;
if (score >= 90) System.out.print("A");
else if (score >= 80) System.out.print("B");
else if (score >= 70) System.out.print("C");
else System.out.print("F");`, q: 'What is printed?', a: ['A', 'B', 'BC', 'BCF'], c: 1, why: 'The first true condition is score >= 80, so only B prints and the rest are skipped.' },
    { st: `int score = 95;
if (score >= 70) System.out.print("C");
else if (score >= 80) System.out.print("B");
else if (score >= 90) System.out.print("A");`, q: 'What is printed, and what is wrong with this code?', a: ['A; nothing is wrong', 'C; the conditions are in the wrong order, so high scores get C', 'CBA; every branch runs', 'Nothing; the code does not compile'], c: 1, why: 'score >= 70 is checked first and is true, so C prints. Check the highest cutoff first.' },
    { st: `int a = 3, b = 8;
if (a > 0) {
  if (b > 10) System.out.print("X");
  else System.out.print("Y");
} else {
  System.out.print("Z");
}`, q: 'What is printed?', a: ['X', 'Y', 'Z', 'YZ'], c: 1, why: 'a > 0 is true, so the inner if runs. b > 10 is false, so Y prints.' },
    { q: 'In an if / else if / else chain with four branches, how many branches can run?', a: ['All four', 'Exactly one', 'At most two', 'None, ever'], c: 1, why: 'With a final else, exactly one branch runs: the first whose condition is true, or the else.' }
  ],
  '2.5': [
    { st: `int age = 15;
boolean hasPass = true;
System.out.println(age >= 13 && age <= 17 && hasPass);`, q: 'What is printed?', a: ['true', 'false', '15', 'The code does not compile'], c: 0, why: 'All three parts are true, so && gives true.' },
    { q: 'What is the value of !(true || false) && true ?', a: ['true', 'false', 'It does not compile', 'null'], c: 1, why: 'true || false is true, ! makes it false, and false && true is false.' },
    { st: `int count = 0;
int total = 50;
if (count != 0 && total / count > 5) {
  System.out.print("high");
} else {
  System.out.print("none");
}`, q: 'What happens when this code runs?', a: ['It prints high', 'It prints none', 'It throws an ArithmeticException', 'It does not compile'], c: 1, why: 'count != 0 is false, so short-circuit evaluation skips the division and the else runs.' },
    { q: 'Which expression is true only when x is between 1 and 10, inclusive?', a: ['x >= 1 || x <= 10', 'x >= 1 && x <= 10', '1 <= x <= 10', 'x > 1 && x < 10'], c: 1, why: 'Both conditions must be true, so use &&. Java does not allow 1 <= x <= 10.' }
  ],
  '2.6': [
    { q: 'Which expression is equivalent to !(a && b) ?', a: ['!a && !b', '!a || !b', 'a || b', '!a && b'], c: 1, why: "By De Morgan's law, negating && turns it into || and negates each part." },
    { q: 'Which expression is equivalent to !(x > 5 || y == 2) ?', a: ['x <= 5 && y != 2', 'x < 5 && y != 2', 'x <= 5 || y != 2', 'x > 5 && y == 2'], c: 0, why: 'Negate each part: !(x > 5) is x <= 5 and !(y == 2) is y != 2, and || becomes &&.' },
    { st: `String a = new String("cat");
String b = new String("cat");
System.out.println((a == b) + " " + a.equals(b));`, q: 'What is printed?', a: ['true true', 'false true', 'true false', 'false false'], c: 1, why: 'a and b are two different objects, so == is false, but they hold the same characters, so equals is true.' },
    { q: 'How can you prove two Boolean expressions are equivalent?', a: ['Test them with one input', 'Show they give the same result for every combination of inputs, such as with a truth table', 'Check that they have the same length', 'Compile them both'], c: 1, why: 'Equivalent expressions match on all possible inputs, which a truth table shows.' }
  ],
  '2.7': [
    { st: `int n = 1;
while (n < 20) {
  n = n * 3;
}
System.out.println(n);`, q: 'What is printed?', a: ['9', '18', '27', '20'], c: 2, why: 'n goes 1, 3, 9, 27. When n is 27 the condition is false and the loop stops.' },
    { st: `int k = 10;
while (k < 5) {
  k++;
}
System.out.println(k);`, q: 'What is printed?', a: ['5', '10', '11', 'Nothing; it is an infinite loop'], c: 1, why: 'The condition is false from the start, so the body never runs.' },
    { st: `int i = 0;
while (i != 7) {
  i += 2;
}`, q: 'What happens when this code runs?', a: ['The loop runs 3 times', 'The loop runs 4 times', 'It is an infinite loop, because i is always even and never equals 7', 'It does not compile'], c: 2, why: 'i takes values 0, 2, 4, 6, 8, ... and skips 7, so the loop never ends.' },
    { st: `int num = 482;
int count = 0;
while (num > 0) {
  num /= 10;
  count++;
}
System.out.println(count);`, q: 'What is printed?', a: ['3', '482', '14', '0'], c: 0, why: 'num goes 48, 4, 0, so the loop runs 3 times. This counts the digits.' }
  ],
  '2.8': [
    { st: `for (int i = 2; i <= 10; i += 3) {
  System.out.print(i + " ");
}`, q: 'What is printed?', a: ['2 5 8', '2 5 8 11', '2 4 6 8 10', '3 6 9'], c: 0, why: 'i is 2, 5, 8. The next value, 11, fails i <= 10.' },
    { q: 'How many times does the body of for (int i = 0; i < 12; i++) run?', a: ['11', '12', '13', '0'], c: 1, why: 'i takes the values 0 through 11, which is 12 passes.' },
    { st: `int sum = 0;
for (int j = 5; j > 0; j--) {
  sum += j;
}
System.out.println(sum);`, q: 'What is printed?', a: ['10', '15', '14', '5'], c: 1, why: '5 + 4 + 3 + 2 + 1 = 15.' },
    { q: 'A loop is supposed to print the numbers 1 to 10. Which header has an off-by-one error?', a: ['for (int i = 1; i <= 10; i++)', 'for (int i = 0; i < 10; i++) with print(i + 1)', 'for (int i = 1; i < 10; i++)', 'for (int i = 1; i < 11; i++)'], c: 2, why: 'i < 10 stops at 9, so 10 is never printed.' }
  ],
  '2.9': [
    { st: `int count = 0;
for (int i = 1; i <= 20; i++) {
  if (i % 4 == 0) count++;
}
System.out.println(count);`, q: 'What is printed?', a: ['4', '5', '20', '6'], c: 1, why: 'The multiples of 4 from 1 to 20 are 4, 8, 12, 16, 20: five of them.' },
    { st: `int n = 3051;
int total = 0;
while (n > 0) {
  total += n % 10;
  n /= 10;
}
System.out.println(total);`, q: 'What is printed?', a: ['9', '3051', '1503', '8'], c: 0, why: 'It adds the digits: 1 + 5 + 0 + 3 = 9.' },
    { q: 'To find the largest of several values typed by a user, what is the best starting value for max?', a: ['0', 'The first value entered', '-1', '100'], c: 1, why: 'Starting with the first value works even if all values are negative. Starting at 0 can give the wrong answer.' },
    { st: `int product = 1;
for (int i = 1; i <= 4; i++) {
  product *= i;
}`, q: 'What value is in product after the loop?', a: ['10', '24', '4', '0'], c: 1, why: '1 * 1 * 2 * 3 * 4 = 24.' }
  ],
  '2.10': [
    { st: `String s = "mississippi";
int count = 0;
for (int i = 0; i < s.length(); i++) {
  if (s.substring(i, i + 1).equals("s")) count++;
}
System.out.println(count);`, q: 'What is printed?', a: ['2', '4', '11', '3'], c: 1, why: 'The letter s appears four times in mississippi.' },
    { st: `String word = "code";
String result = "";
for (int i = 0; i < word.length(); i++) {
  result = word.substring(i, i + 1) + result;
}
System.out.println(result);`, q: 'What is printed?', a: ['code', 'edoc', 'cdoe', 'eeee'], c: 1, why: 'Each letter is added to the front of result, which reverses the word.' },
    { q: 'Why does a loop over a String use i < s.length() instead of i <= s.length() when calling s.substring(i, i + 1)?', a: ['There is no difference', 'With <=, the last pass would ask for substring(length, length + 1), which throws StringIndexOutOfBoundsException', 'With <, the first letter is skipped', 'length() returns one less than the number of letters'], c: 1, why: 'The last valid start index is length() - 1.' },
    { st: `String s = "a1b2c3";
String out = "";
for (int i = 0; i < s.length(); i += 2) {
  out += s.substring(i, i + 1);
}
System.out.println(out);`, q: 'What is printed?', a: ['abc', '123', 'a1b2c3', 'a2c'], c: 0, why: 'The loop takes characters at indexes 0, 2, 4: a, b, c.' }
  ],
  '2.11': [
    { st: `int count = 0;
for (int r = 0; r < 4; r++) {
  for (int c = 0; c < 5; c++) {
    count++;
  }
}
System.out.println(count);`, q: 'What is printed?', a: ['9', '20', '5', '25'], c: 1, why: 'The inner loop runs 5 times for each of 4 outer passes: 4 x 5 = 20.' },
    { st: `for (int i = 1; i <= 3; i++) {
  for (int j = 1; j <= i; j++) {
    System.out.print("*");
  }
  System.out.println();
}`, q: 'What is printed?', a: ['3 rows of 3 stars each', 'Rows of 1, 2, then 3 stars', 'Rows of 3, 2, then 1 stars', 'One row of 6 stars'], c: 1, fixed: true, why: 'The inner loop runs i times, so the rows have 1, 2, then 3 stars.' },
    { st: `for (int a = 1; a <= 2; a++) {
  for (int b = 1; b <= 3; b++) {
    System.out.print(a * b + " ");
  }
}`, q: 'What is printed?', a: ['1 2 3 2 4 6', '1 2 2 4 3 6', '1 2 3 4 5 6', '2 4 6'], c: 0, why: 'For a = 1 the products are 1 2 3; for a = 2 they are 2 4 6.' },
    { st: `int total = 0;
for (int i = 0; i < 3; i++) {
  for (int j = i; j < 3; j++) {
    total++;
  }
}`, q: 'What is the value of total after the loops?', a: ['9', '6', '3', '4'], c: 1, why: 'The inner loop runs 3, then 2, then 1 times: 3 + 2 + 1 = 6.' }
  ],
  '2.12': [
    { st: `for (int i = 0; i < n; i++) {
  System.out.println(i);   // line X
}`, q: 'How many times does line X run?', a: ['1', 'n - 1', 'n', 'n x n'], c: 2, why: 'i takes the values 0 through n - 1, which is n times.' },
    { st: `for (int i = 0; i < n; i++) {
  for (int j = 0; j < n; j++) {
    count++;   // line Y
  }
}`, q: 'How many times does line Y run?', a: ['n', '2n', 'n x n', 'n + 1'], c: 2, why: 'The inner loop runs n times for each of n outer passes.' },
    { st: `for (int i = 1; i <= 100; i *= 2) {
  System.out.println(i);
}`, q: 'How many times does the println statement run?', a: ['7', '50', '100', '6'], c: 0, why: 'i is 1, 2, 4, 8, 16, 32, 64. The next value, 128, is too large: 7 times.' },
    { q: 'Program A uses one loop over n items. Program B uses two nested loops over n items. Both give the same output. Which is most likely true for large n?', a: ['A and B take the same time', 'A does far fewer steps than B', 'B does far fewer steps than A', 'B is always more correct'], c: 1, why: 'About n steps grows much more slowly than about n x n steps.' }
  ],

  // ---------- Unit 3: Class Creation ----------
  '3.1': [
    { q: 'A program for a library needs to track books. Which design best uses data abstraction?', a: ['Use separate unrelated variables for every book title and author', 'Create a Book class that groups a title, author, and due date', 'Write all the code in main', 'Store every book as one long String'], c: 1, why: 'Grouping related data into a class is data abstraction.' },
    { q: 'Which of the following is shown in a class diagram?', a: ['Only the main method', 'The class name, its instance variables, and its methods', 'Every line of code in the class', 'The output of the program'], c: 1, why: 'A class diagram summarizes a class: name, variables, and methods.' },
    { q: 'Why do programmers break a large program into classes and methods?', a: ['To make the program longer', 'To make the code easier to write, test, understand, and reuse', 'Because Java only allows 10 lines per method', 'To avoid using variables'], c: 1, why: 'Decomposition manages complexity.' },
    { q: 'A method named calculateTax hides the steps of the tax calculation from the code that calls it. This is an example of what?', a: ['Procedural abstraction', 'Integer overflow', 'Casting', 'A syntax error'], c: 0, why: 'Wrapping steps into a named method is procedural abstraction.' }
  ],
  '3.2': [
    { q: 'A school app stores students\' home addresses. Which practice best protects users?', a: ['Post the data publicly so it is easy to find', 'Collect only the data needed and store it securely', 'Share the data with any company that asks', 'Keep the data forever just in case'], c: 1, why: 'Collect the minimum and protect it.' },
    { q: 'A developer finds useful code on a website. What should the developer do before using it in a product?', a: ['Use it without telling anyone', 'Check its license, follow its terms, and give credit', 'Change the variable names so it looks original', 'Nothing; all online code is free to use'], c: 1, why: 'Code is intellectual property. Licenses say how it may be used.' },
    { q: 'A program that screens job applications rejects most applicants from one neighborhood because of patterns in old data. This is an example of what?', a: ['Integer overflow', 'Bias in a computing system', 'A syntax error', 'Encapsulation'], c: 1, why: 'Unfair results built into software from biased data are a form of bias.' },
    { q: 'Why is careful testing especially important for software that controls medical devices?', a: ['It makes the code shorter', 'Errors could directly harm people, so the system must be reliable', 'Medical software is never compiled', 'It is not important'], c: 1, why: 'System reliability matters most where failures can hurt people.' }
  ],
  '3.3': [
    { st: `public class Player {
  private String name;
  private int score;
  ...
}`, q: 'Why are name and score declared private?', a: ['So they can be changed from any class', 'So only code inside Player can access them directly, which protects the data', 'Because private variables use less memory', 'Because instance variables must be private or the code will not compile'], c: 1, why: 'Private instance variables support encapsulation.' },
    { st: `Player p = new Player("Ava");
p.score = 100;`, q: 'This code is in a different class. What happens?', a: ['score becomes 100', 'A compile error, because score is private', 'A NullPointerException', 'score becomes 0'], c: 1, why: 'Private members cannot be accessed from outside the class.' },
    { q: 'Which of the following is NOT one of the main parts of a class?', a: ['Instance variables', 'Constructors', 'Methods', 'The compiler'], c: 3, why: 'A class contains instance variables, constructors, and methods.' },
    { q: 'What is encapsulation?', a: ['Putting all classes in one file', 'Keeping an object\'s data private and controlling access through public methods', 'Using the keyword static', 'Writing comments in a class'], c: 1, why: 'Encapsulation hides data and exposes methods.' }
  ],
  '3.4': [
    { st: `public class Pet {
  private String name;
  private int age;
  public Pet(String n) {
    name = n;
  }
}

Pet p = new Pet("Milo");`, q: 'What is the value of age in the object p?', a: ['null', '0', '1', 'It is undefined, so the code does not compile'], c: 1, why: 'Instance variables that are not set get default values. An int defaults to 0.' },
    { q: 'Which of the following is a correct constructor header for a class named Lamp?', a: ['public void Lamp()', 'public Lamp()', 'public lamp() returns Lamp', 'public static Lamp()'], c: 1, why: 'Constructors have the class name and no return type, not even void.' },
    { q: 'What is the main job of a constructor?', a: ['To print the object', 'To set the starting values of a new object\'s instance variables', 'To delete an object', 'To compare two objects'], c: 1, why: 'Constructors initialize new objects.' },
    { st: `public class Box {
  private int w, h;
  public Box() { w = 1; h = 1; }
  public Box(int side) { w = side; h = side; }
  public Box(int w2, int h2) { w = w2; h = h2; }
}`, q: 'Which call uses the constructor that makes a 3 by 3 box?', a: ['new Box()', 'new Box(3)', 'new Box(3, 1)', 'Box(3)'], c: 1, why: 'The one-parameter constructor sets both w and h to side.' }
  ],
  '3.5': [
    { st: `public int getBonus(int score) {
  if (score > 90) {
    return 10;
  }
}`, q: 'Why does this method fail to compile?', a: ['score must be a double', 'Not every path returns a value; if score <= 90 nothing is returned', 'Methods cannot use if statements', 'return must be the first line'], c: 1, why: 'A non-void method must return a value on every possible path.' },
    { st: `public int check(int x) {
  if (x < 0) return -1;
  System.out.print("pos ");
  return 1;
}

int r = check(-5);`, q: 'What is printed, and what is r?', a: ['pos is printed; r is 1', 'Nothing is printed; r is -1', 'pos is printed; r is -1', 'Nothing is printed; r is 1'], c: 1, why: 'return ends the method immediately, so the print is never reached.' },
    { st: `public class Dog {
  private String name;
  public Dog(String n) { name = n; }
  public String toString() { return "Dog: " + name; }
}

System.out.println(new Dog("Rex"));`, q: 'What is printed?', a: ['Dog@1b6d3586 or a similar address', 'Dog: Rex', 'Rex', 'Nothing'], c: 1, why: 'println calls the object\'s toString method automatically.' },
    { q: 'Which method is most likely a mutator?', a: ['public int getLevel()', 'public void setLevel(int newLevel)', 'public String toString()', 'public boolean isEmpty()'], c: 1, why: 'Mutators change an object\'s data, often named set...' }
  ],
  '3.6': [
    { st: `public static void addTen(int n) {
  n = n + 10;
}

int x = 5;
addTen(x);
System.out.println(x);`, q: 'What is printed?', a: ['15', '5', '10', '0'], c: 1, why: 'n gets a copy of x. Changing n does not change x.' },
    { st: `public class Wallet {
  private int cash;
  public void add(int amt) { cash += amt; }
  public int getCash() { return cash; }
}

public static void tip(Wallet w) {
  w.add(5);
}

Wallet mine = new Wallet();
tip(mine);
System.out.println(mine.getCash());`, q: 'What is printed?', a: ['0', '5', '10', 'The code does not compile'], c: 1, why: 'w gets a copy of the reference, so it points to the same Wallet. Calling add changes that object.' },
    { st: `public static void replace(Wallet w) {
  w = new Wallet();
  w.add(50);
}

Wallet mine = new Wallet();
replace(mine);
System.out.println(mine.getCash());`, q: 'What is printed? (Wallet is the class from the previous question.)', a: ['50', '0', 'null', 'A NullPointerException is thrown'], c: 1, why: 'w now points to a brand new Wallet. The caller\'s mine still points to the original, which has 0.' },
    { q: 'Which statement best describes how Java passes arguments?', a: ['Primitives by value, objects by name', 'Always by value: the parameter gets a copy of the argument, which for an object is a copy of the reference', 'Always by reference', 'Only primitives can be passed'], c: 1, why: 'Java is always pass by value. For objects, the value is a reference.' }
  ],
  '3.7': [
    { st: `public class Ticket {
  private static int sold = 0;
  public Ticket() { sold++; }
  public static int getSold() { return sold; }
}

new Ticket(); new Ticket(); new Ticket();
System.out.println(Ticket.getSold());`, q: 'What is printed?', a: ['0', '1', '3', 'The code does not compile'], c: 2, why: 'sold is static, so all Ticket objects share one copy. Each constructor call adds 1.' },
    { st: `public class Robot {
  private int battery;
  public static void charge() {
    battery = 100;
  }
}`, q: 'Why does this class fail to compile?', a: ['battery must be public', 'A static method cannot directly use an instance variable', 'charge must return an int', 'Static methods cannot have a body'], c: 1, why: 'A static method has no particular object, so it cannot reach battery.' },
    { q: 'Which declaration creates a constant that cannot be changed?', a: ['public static int MAX = 10;', 'public static final int MAX = 10;', 'public int MAX = 10;', 'private changeable int MAX = 10;'], c: 1, why: 'final means the value cannot change after it is set.' },
    { q: 'How many copies of a static variable exist if 25 objects of the class are created?', a: ['0', '1', '25', '26'], c: 1, why: 'A static variable belongs to the class, so there is exactly one copy.' }
  ],
  '3.8': [
    { st: `public void test() {
  for (int i = 0; i < 3; i++) {
    int square = i * i;
  }
  System.out.println(square);
}`, q: 'Why does this method fail to compile?', a: ['i is not declared', 'square is a local variable declared inside the loop, so it does not exist after the loop', 'println cannot print ints', 'The loop runs too many times'], c: 1, why: 'A variable only exists in the block where it is declared.' },
    { st: `public class Light {
  private int level = 5;
  public void dim(int level) {
    level = level - 1;
  }
  public int getLevel() { return level; }
}

Light x = new Light();
x.dim(9);
System.out.println(x.getLevel());`, q: 'What is printed?', a: ['4', '8', '5', '9'], c: 2, why: 'The parameter level shadows the instance variable, so only the parameter changes. The instance variable stays 5.' },
    { q: 'Where can a private instance variable be used?', a: ['Anywhere in the program', 'Only in the main method', 'Anywhere inside its own class', 'Only inside its constructor'], c: 2, why: 'Instance variables are in scope throughout the class.' },
    { q: 'What happens to a method\'s local variables when the method finishes?', a: ['They keep their values for the next call', 'They no longer exist', 'They become instance variables', 'They become static'], c: 1, why: 'Local variables exist only while their block runs.' }
  ],
  '3.9': [
    { st: `public class Light {
  private int level = 5;
  public void setLevel(int level) {
    this.level = level;
  }
  public int getLevel() { return level; }
}

Light x = new Light();
x.setLevel(9);
System.out.println(x.getLevel());`, q: 'What is printed?', a: ['5', '9', '0', '14'], c: 1, why: 'this.level refers to the instance variable, so it is set to the parameter, 9.' },
    { q: 'What does the keyword this refer to inside an instance method?', a: ['The class itself', 'The object the method was called on', 'The main method', 'The most recently created object of any class'], c: 1, why: 'this is a reference to the current object.' },
    { q: 'Why can a static method not use this?', a: ['Because static methods are private', 'Because static methods are not called on any particular object', 'Because this only works in constructors', 'Because static methods cannot have parameters'], c: 1, why: 'There is no current object in a static method.' },
    { st: `public class Point {
  private int x, y;
  public Point(int x, int y) {
    x = x;
    y = y;
  }
  public int getX() { return x; }
}

System.out.println(new Point(3, 4).getX());`, q: 'What is printed?', a: ['3', '0', '4', 'The code does not compile'], c: 1, why: 'x = x assigns the parameter to itself. The instance variable keeps its default 0. Use this.x = x.' }
  ],

  // ---------- Unit 4: Data Collections ----------
  '4.1': [
    { q: 'A fitness app collects users\' exact locations all day, even though it only needs step counts. Which concern does this raise most directly?', a: ['Integer overflow', 'Privacy, because it collects more personal data than needed', 'Syntax errors', 'Slow loops'], c: 1, why: 'Collecting unneeded personal data creates privacy risks.' },
    { q: 'A face recognition program was trained mostly on photos of adults. It makes many mistakes with children. What is the most likely cause?', a: ['The data set was biased because it left out a group', 'The program used a for loop', 'The program was not compiled', 'Children\'s photos are too large'], c: 0, why: 'Missing groups in the data lead to unfair or wrong results for those groups.' },
    { q: 'Which practice shows responsible data collection?', a: ['Collecting as much data as possible', 'Telling users what is collected and how it is used, and getting their consent', 'Selling data without telling users', 'Hiding the privacy policy'], c: 1, why: 'Informed consent is a key part of ethical data collection.' },
    { q: 'Data that seems anonymous can sometimes identify a person when it is combined with other data. What does this show?', a: ['Combining data sets can create privacy risks', 'Data is always safe once names are removed', 'Only names count as personal data', 'Data sets cannot be combined'], c: 0, why: 'Combining several pieces of data can re-identify people.' }
  ],
  '4.2': [
    { q: 'In a data set of students where each row is one student and each column is a fact like grade or GPA, what is one row called?', a: ['A record', 'A loop', 'A method', 'A class variable'], c: 0, why: 'Each row is a record describing one item.' },
    { q: 'A data set has some temperatures stored as text like "N/A". What should happen before computing an average?', a: ['Nothing; Java ignores bad data', 'Clean the data by handling or removing the missing values', 'Delete the whole data set', 'Convert every value to a String'], c: 1, why: 'Data cleaning fixes or removes missing and invalid values.' },
    { q: 'Which Java structure is the best fit for a list of song titles that grows as users add songs?', a: ['int', 'A fixed-size array', 'ArrayList<String>', 'boolean'], c: 2, why: 'An ArrayList can grow, so it fits data whose size changes.' },
    { q: 'Which question could be answered by processing a data set of daily rainfall amounts for a year?', a: ['What is the name of the weather reporter?', 'How many days had more than 1 inch of rain?', 'What programming language made the data?', 'What color is the sky?'], c: 1, why: 'Counting items that meet a condition is a standard data question.' }
  ],
  '4.3': [
    { st: `int[] nums = {7, 2, 9, 4};
System.out.println(nums[1] + nums[nums.length - 1]);`, q: 'What is printed?', a: ['11', '6', '13', '16'], c: 1, why: 'nums[1] is 2 and the last element nums[3] is 4, so 2 + 4 = 6.' },
    { st: `double[] prices = new double[3];
System.out.println(prices[2]);`, q: 'What is printed?', a: ['0', '0.0', 'null', 'An exception is thrown'], c: 1, why: 'A new double array is filled with the default value 0.0.' },
    { st: `int[] a = {1, 2, 3};
a[3] = 4;`, q: 'What happens when this code runs?', a: ['The array grows to length 4', 'An ArrayIndexOutOfBoundsException is thrown', 'a[3] becomes 4 and a[0] is removed', 'It does not compile'], c: 1, why: 'Valid indexes are 0 to 2. Arrays cannot grow.' },
    { st: `String[] names = new String[4];`, q: 'What value does names[0] hold?', a: ['""', 'null', '0', '"names"'], c: 1, why: 'Arrays of objects are filled with null by default.' }
  ],
  '4.4': [
    { st: `int[] arr = {3, 6, 9};
for (int x : arr) {
  x = x * 2;
}
System.out.println(arr[0] + arr[1] + arr[2]);`, q: 'What is printed?', a: ['36', '18', '369', '0'], c: 1, why: 'The enhanced for variable is a copy, so the array does not change: 3 + 6 + 9 = 18.' },
    { st: `int[] arr = {3, 6, 9};
for (int i = 0; i < arr.length; i++) {
  arr[i] = arr[i] * 2;
}
System.out.println(arr[0] + arr[1] + arr[2]);`, q: 'What is printed?', a: ['18', '36', '6129', '0'], c: 1, why: 'The indexed loop changes the array itself: 6 + 12 + 18 = 36.' },
    { st: `int[] arr = {5, 10, 15, 20, 25};
for (int i = arr.length - 1; i >= 0; i -= 2) {
  System.out.print(arr[i] + " ");
}`, q: 'What is printed?', a: ['5 15 25', '25 15 5', '25 20 15 10 5', '20 10'], c: 1, why: 'i is 4, 2, 0, so it prints arr[4], arr[2], arr[0].' },
    { q: 'Which loop header visits every index of an array named data?', a: ['for (int i = 1; i <= data.length; i++)', 'for (int i = 0; i < data.length; i++)', 'for (int i = 0; i <= data.length; i++)', 'for (int i = 0; i < data.length(); i++)'], c: 1, why: 'Indexes run from 0 to length - 1, and length has no parentheses for arrays.' }
  ],
  '4.5': [
    { st: `int[] a = {4, 8, 1, 9, 3};
int m = a[0];
for (int i = 1; i < a.length; i++) {
  if (a[i] < m) m = a[i];
}
System.out.println(m);`, q: 'What is printed?', a: ['4', '1', '9', '3'], c: 1, why: 'This finds the minimum, which is 1.' },
    { st: `int[] a = {2, 4, 4, 7, 7, 7};
int count = 0;
for (int i = 0; i < a.length - 1; i++) {
  if (a[i] == a[i + 1]) count++;
}
System.out.println(count);`, q: 'What is printed?', a: ['2', '3', '5', '6'], c: 1, why: 'Matching neighbor pairs: (4,4), (7,7), (7,7). That is 3.' },
    { st: `int[] a = {1, 2, 3, 4};
int temp = a[0];
for (int i = 0; i < a.length - 1; i++) {
  a[i] = a[i + 1];
}
a[a.length - 1] = temp;`, q: 'What are the contents of a after this code runs?', a: ['{4, 1, 2, 3}', '{2, 3, 4, 1}', '{1, 1, 2, 3}', '{2, 3, 4, 4}'], c: 1, why: 'Every element shifts left, and the old first element moves to the end: a left rotation.' },
    { q: 'A loop compares a[i] with a[i + 1]. Why must the loop stop at i < a.length - 1?', a: ['So it runs faster', 'So a[i + 1] never goes past the last index', 'Because the first element is skipped', 'It does not need to stop early'], c: 1, why: 'When i is the last index, i + 1 would be out of bounds.' }
  ],
  '4.6': [
    { q: 'Which pair of classes is used to read numbers from a text file in Java?', a: ['Math and String', 'File and Scanner', 'Integer and Double', 'ArrayList and Math'], c: 1, why: 'A File names the file, and a Scanner reads from it.' },
    { st: `Scanner in = new Scanner(new File("scores.txt"));
int total = 0;
while (in.hasNextInt()) {
  total += in.nextInt();
}`, q: 'If scores.txt contains 10 20 30, what is total after the loop?', a: ['30', '60', '102030', '0'], c: 1, why: 'The loop reads each int until there are no more: 10 + 20 + 30 = 60.' },
    { st: `String line = "Ana,17,Chess";
String[] parts = line.split(",");
System.out.println(parts[1]);`, q: 'What is printed?', a: ['Ana', '17', 'Chess', ','], c: 1, why: 'split breaks the line at commas into {"Ana", "17", "Chess"}, and index 1 is "17".' },
    { q: 'What happens if a program tries to open a file that does not exist?', a: ['An empty file is used', 'A FileNotFoundException is thrown', 'The program prints null', 'Java creates the file and fills it with zeros'], c: 1, why: 'Opening a missing file throws a FileNotFoundException, a kind of IOException.' }
  ],
  '4.7': [
    { q: 'Why does Java have the Integer wrapper class?', a: ['To make ints faster', 'So int values can be stored in collections like ArrayList that hold only objects', 'To store decimals', 'Integer is the same as String'], c: 1, why: 'ArrayList holds objects, so ints are wrapped as Integer objects.' },
    { st: `ArrayList<Integer> list = new ArrayList<Integer>();
list.add(5);
int x = list.get(0) + 1;`, q: 'Which conversions happen automatically in this code?', a: ['None', 'Autoboxing when 5 is added, and unboxing when get(0) is used in the sum', 'Casting to double', 'Converting to String'], c: 1, why: 'The int 5 is autoboxed to an Integer, and the Integer is unboxed for the addition.' },
    { q: 'What is the value of Double.parseDouble("2.5") * 2 ?', a: ['"2.52.5"', '5.0', '4', '"5.0"'], c: 1, why: 'parseDouble gives 2.5, and 2.5 * 2 = 5.0.' },
    { st: `Integer n = null;
int m = n + 1;`, q: 'What happens when this code runs?', a: ['m is 1', 'm is 0', 'A NullPointerException is thrown when n is unboxed', 'It does not compile'], c: 2, why: 'Unboxing a null Integer throws a NullPointerException.' }
  ],
  '4.8': [
    { st: `ArrayList<String> list = new ArrayList<String>();
list.add("A");
list.add("B");
list.add(1, "C");
list.add("D");
System.out.println(list);`, q: 'What is printed?', a: ['[A, B, C, D]', '[A, C, B, D]', '[C, A, B, D]', '[A, C, D]'], c: 1, why: 'add(1, "C") inserts C at index 1, shifting B right. Then D goes on the end.' },
    { st: `ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(10); nums.add(20); nums.add(30);
int old = nums.set(1, 99);
nums.remove(0);
System.out.println(old + " " + nums);`, q: 'What is printed?', a: ['20 [99, 30]', '99 [20, 30]', '20 [10, 99, 30]', '10 [99, 30]'], c: 0, why: 'set returns the old value 20 and stores 99. remove(0) then removes 10.' },
    { q: 'Which call returns the number of elements in an ArrayList named list?', a: ['list.length', 'list.length()', 'list.size()', 'list.count()'], c: 2, why: 'ArrayList uses size(). Arrays use length.' },
    { q: 'Which declaration correctly creates an empty ArrayList of Doubles?', a: ['ArrayList<double> d = new ArrayList<double>();', 'ArrayList<Double> d = new ArrayList<Double>();', 'ArrayList d = new Double[];', 'Double<ArrayList> d = new ArrayList();'], c: 1, why: 'ArrayList needs an object type, so use the wrapper class Double.' }
  ],
  '4.9': [
    { st: `ArrayList<Integer> list = new ArrayList<Integer>();
// list contains [4, 7, 7, 2]
for (int i = 0; i < list.size(); i++) {
  if (list.get(i) == 7) list.remove(i);
}
System.out.println(list);`, q: 'What is printed?', a: ['[4, 2]', '[4, 7, 2]', '[4, 7, 7, 2]', 'An exception is thrown'], c: 1, why: 'After removing the 7 at index 1, the second 7 slides into index 1, but i moves on to 2, so it is skipped.' },
    { st: `// list contains [4, 7, 7, 2]
for (int i = list.size() - 1; i >= 0; i--) {
  if (list.get(i) == 7) list.remove(i);
}
System.out.println(list);`, q: 'What is printed?', a: ['[4, 2]', '[4, 7, 2]', '[2, 4]', 'An exception is thrown'], c: 0, why: 'Looping backward means removed elements never shift an unchecked element into a visited index.' },
    { st: `ArrayList<String> words = new ArrayList<String>();
// words contains ["hi", "yo"]
for (String w : words) {
  words.add(w + "!");
}`, q: 'What happens when this code runs?', a: ['words becomes ["hi", "yo", "hi!", "yo!"]', 'A ConcurrentModificationException is thrown', 'Nothing changes', 'It does not compile'], c: 1, why: 'Changing the size of a list inside an enhanced for loop throws a ConcurrentModificationException.' },
    { q: 'Which expression gets the last element of a non-empty ArrayList named list?', a: ['list.get(list.size())', 'list.get(list.size() - 1)', 'list[list.length - 1]', 'list.last()'], c: 1, why: 'The last index is size() - 1.' }
  ],
  '4.10': [
    { st: `ArrayList<Integer> src = new ArrayList<Integer>();
// src contains [3, 8, 5, 12, 6]
ArrayList<Integer> out = new ArrayList<Integer>();
for (int n : src) {
  if (n % 2 == 0) out.add(n);
}
System.out.println(out);`, q: 'What is printed?', a: ['[3, 5]', '[8, 12, 6]', '[3, 8, 5, 12, 6]', '[8, 6]'], c: 1, why: 'The loop filters the even numbers into a new list.' },
    { st: `// sorted contains [2, 5, 9]
int val = 6;
int i = 0;
while (i < sorted.size() && sorted.get(i) < val) i++;
sorted.add(i, val);`, q: 'What are the contents of sorted after this code runs?', a: ['[2, 5, 9, 6]', '[2, 5, 6, 9]', '[6, 2, 5, 9]', '[2, 6, 5, 9]'], c: 1, why: 'i stops at 2, the first value not less than 6, and 6 is inserted there to keep the list sorted.' },
    { q: 'When is an ArrayList a better choice than an array?', a: ['When the number of items is fixed and known', 'When items need to be added and removed as the program runs', 'When storing ints only', 'Never'], c: 1, why: 'ArrayLists resize automatically.' },
    { st: `// names contains ["Al", "Bea", "Cy"]
String longest = names.get(0);
for (String s : names) {
  if (s.length() > longest.length()) longest = s;
}
System.out.println(longest);`, q: 'What is printed?', a: ['Al', 'Bea', 'Cy', 'AlBeaCy'], c: 1, why: 'Bea, with 3 letters, is the longest.' }
  ],
  '4.11': [
    { st: `int[][] g = { {1, 2, 3},
              {4, 5, 6} };
System.out.println(g[1][0] + g[0][2]);`, q: 'What is printed?', a: ['5', '7', '6', '3'], c: 1, why: 'g[1][0] is 4 (row 1, column 0) and g[0][2] is 3, so 4 + 3 = 7.' },
    { st: `int[][] seats = new int[5][8];`, q: 'What are seats.length and seats[0].length?', a: ['8 and 5', '5 and 8', '40 and 8', '5 and 5'], c: 1, why: 'The first size is the number of rows (5) and the second is the number of columns (8).' },
    { q: 'Which expression accesses the element in the third row and second column of a 2D array named m?', a: ['m[3][2]', 'm[2][1]', 'm[1][2]', 'm[2, 1]'], c: 1, why: 'Indexes start at 0 and the row comes first: row 2, column 1.' },
    { st: `String[][] board = new String[3][3];`, q: 'What value does board[1][1] hold?', a: ['""', 'null', '"0"', 'An exception is thrown'], c: 1, why: 'Object elements default to null.' }
  ],
  '4.12': [
    { st: `int[][] g = { {1, 2},
              {3, 4},
              {5, 6} };
for (int c = 0; c < g[0].length; c++) {
  for (int r = 0; r < g.length; r++) {
    System.out.print(g[r][c] + " ");
  }
}`, q: 'What is printed?', a: ['1 2 3 4 5 6', '1 3 5 2 4 6', '6 5 4 3 2 1', '1 2 5 6'], c: 1, why: 'The outer loop is over columns, so this is column-major order: down column 0, then column 1.' },
    { st: `int[][] g = { {2, 4}, {6, 8} };
int sum = 0;
for (int[] row : g) {
  for (int v : row) {
    sum += v;
  }
}
System.out.println(sum);`, q: 'What is printed?', a: ['20', '12', '6', '2468'], c: 0, why: 'The nested enhanced for loops visit every value: 2 + 4 + 6 + 8 = 20.' },
    { q: 'In a row-major traversal, which loop goes through the rows?', a: ['The inner loop', 'The outer loop', 'Both loops', 'Neither loop'], c: 1, why: 'Row-major: outer loop over rows, inner loop over columns.' },
    { st: `int[][] g = new int[2][3];
for (int r = 0; r < g.length; r++)
  for (int c = 0; c < g[0].length; c++)
    g[r][c] = r + c;
System.out.println(g[1][2]);`, q: 'What is printed?', a: ['2', '3', '1', '0'], c: 1, why: 'Each cell stores row + column, so g[1][2] is 1 + 2 = 3.' }
  ],
  '4.13': [
    { st: `int[][] g = { {3, 1, 4},
              {1, 5, 9},
              {2, 6, 5} };
int total = 0;
for (int r = 0; r < g.length; r++) {
  total += g[r][1];
}
System.out.println(total);`, q: 'What is printed?', a: ['8', '12', '15', '13'], c: 1, why: 'This adds column 1: 1 + 5 + 6 = 12.' },
    { st: `int[][] g = { {3, 1, 4},
              {1, 5, 9},
              {2, 6, 5} };
int count = 0;
for (int r = 0; r < g.length; r++)
  for (int c = 0; c < g[r].length; c++)
    if (g[r][c] > 4) count++;
System.out.println(count);`, q: 'What is printed?', a: ['3', '4', '5', '2'], c: 1, why: 'Values greater than 4 are 5, 9, 6, and 5: four of them.' },
    { q: 'A game checks the cell above position (r, c) using grid[r - 1][c]. What should it check first?', a: ['That c > 0', 'That r > 0', 'That r < grid.length', 'Nothing'], c: 1, why: 'When r is 0 there is no row above, and r - 1 would be out of bounds.' },
    { st: `int[][] g = { {3, 1, 4},
              {1, 5, 9},
              {2, 6, 5} };
int sum = 0;
for (int i = 0; i < g.length; i++) {
  sum += g[i][i];
}`, q: 'What is the value of sum after the loop?', a: ['13', '11', '15', '9'], c: 0, why: 'This adds the main diagonal: 3 + 5 + 5 = 13.' }
  ],
  '4.14': [
    { q: 'Which search requires the data to be sorted?', a: ['Linear search', 'Binary search', 'Both', 'Neither'], c: 1, why: 'Binary search throws away half the data based on order, so the data must be sorted.' },
    { q: 'About how many elements does binary search check, at most, to search a sorted list of 1,000 items?', a: ['About 10', 'About 100', 'About 500', '1,000'], c: 0, why: 'Each check halves the list: 1000, 500, 250, ... about 10 checks.' },
    { st: `int[] a = {2, 5, 8, 12, 16, 23, 38};
// binary search for 23: low = 0, high = 6`, q: 'Which elements are checked, in order, before 23 is found? (mid = (low + high) / 2)', a: ['12, 23', '12, 16, 23', '2, 5, 8, 12, 16, 23', '16, 23'], c: 0, why: 'mid = 3 gives 12, too small, so low = 4. mid = (4 + 6) / 2 = 5 gives 23.' },
    { st: `public static int find(int[] a, int t) {
  for (int i = 0; i < a.length; i++) {
    if (a[i] == t) return i;
  }
  return -1;
}`, q: 'What does find(new int[]{4, 9, 4, 1}, 4) return?', a: ['0', '2', '-1', '4'], c: 0, why: 'Linear search returns the index of the first match, which is 0.' }
  ],
  '4.15': [
    { st: `int[] a = {5, 3, 8, 1};
// after the first pass of selection sort (smallest to largest)`, q: 'What does the array look like after the first pass of selection sort?', a: ['{1, 3, 8, 5}', '{3, 5, 8, 1}', '{1, 5, 3, 8}', '{3, 5, 1, 8}'], c: 0, why: 'Selection sort finds the smallest value, 1, and swaps it with the first element, 5.' },
    { st: `int[] a = {5, 3, 8, 1};
// after the first two passes of insertion sort (smallest to largest)`, q: 'What does the array look like after the first two passes of insertion sort?', a: ['{3, 5, 8, 1}', '{1, 3, 5, 8}', '{3, 5, 1, 8}', '{1, 3, 8, 5}'], c: 0, why: 'Pass 1 inserts 3 before 5. Pass 2 inserts 8, which is already in place.' },
    { st: `int temp = a[i];
a[i] = a[j];
a[j] = temp;`, q: 'What does this code do?', a: ['Copies a[i] into both positions', 'Swaps a[i] and a[j]', 'Deletes a[j]', 'Sorts the array'], c: 1, why: 'The temporary variable saves a[i] so the two values can be exchanged.' },
    { q: 'Which sort is usually faster on an array that is already almost in order?', a: ['Selection sort', 'Insertion sort', 'They always take exactly the same time', 'Neither can sort that array'], c: 1, why: 'Insertion sort barely moves elements that are already in place, while selection sort always scans the rest of the array.' }
  ],
  '4.16': [
    { st: `public static int f(int n) {
  if (n <= 1) return 1;
  return n * f(n - 1);
}`, q: 'What does f(4) return?', a: ['4', '10', '24', '1'], c: 2, why: '4 * 3 * 2 * 1 = 24.' },
    { st: `public static int g(int n) {
  if (n == 0) return 0;
  return n % 10 + g(n / 10);
}`, q: 'What does g(352) return?', a: ['10', '352', '253', '3'], c: 0, why: 'It adds the digits: 2 + 5 + 3 + 0 = 10.' },
    { st: `public static void down(int n) {
  if (n > 0) {
    down(n - 1);
    System.out.print(n + " ");
  }
}`, q: 'What is printed by down(3)?', a: ['3 2 1', '1 2 3', '3 2 1 0', '0 1 2 3'], c: 1, why: 'Each call recurses first and prints on the way back, so the smallest prints first.' },
    { st: `public static int h(int n) {
  return n + h(n - 1);
}`, q: 'What happens when h(5) is called?', a: ['It returns 15', 'It returns 0', 'It never reaches a base case, so it throws a StackOverflowError', 'It does not compile'], c: 2, why: 'With no base case, the calls never stop.' }
  ],
  '4.17': [
    { q: 'Which best describes merge sort?', a: ['Repeatedly swap the smallest remaining element into place', 'Split the list in half, sort each half recursively, then merge the sorted halves', 'Insert each element into the sorted part of the list', 'Check each element until the target is found'], c: 1, why: 'Merge sort is a divide-and-conquer recursive algorithm.' },
    { st: `Left half:  {2, 7, 9}
Right half: {3, 4, 10}`, q: 'When these sorted halves are merged, what are the first four elements of the result?', a: ['2, 3, 4, 7', '2, 7, 9, 3', '2, 3, 7, 4', '3, 4, 10, 2'], c: 0, why: 'Merging takes the smaller front value each time: 2, 3, 4, 7.' },
    { q: 'For a very large list, which sort generally does the fewest steps?', a: ['Selection sort', 'Insertion sort on random data', 'Merge sort', 'They are all the same'], c: 2, why: 'Merge sort takes about n log n steps, while selection and insertion take about n x n.' },
    { st: `public static int bs(int[] a, int t, int lo, int hi) {
  if (lo > hi) return -1;
  int mid = (lo + hi) / 2;
  if (a[mid] == t) return mid;
  if (a[mid] < t) return bs(a, t, mid + 1, hi);
  return bs(a, t, lo, mid - 1);
}`, q: 'What is the base case that means the target is not in the array?', a: ['a[mid] == t', 'lo > hi', 'a[mid] < t', 'mid == 0'], c: 1, why: 'When lo passes hi, the search range is empty, so it returns -1.' }
  ]
};

// Use these questions as each topic's check for understanding.
(window.AP_UNITS || []).forEach(u => u.topics.forEach(t => { if (window.AP_QUESTIONS[t.id]) t.quiz = window.AP_QUESTIONS[t.id]; }));
