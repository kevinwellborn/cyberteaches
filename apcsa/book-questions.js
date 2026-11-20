// Practice questions from Kevin Wellborn's AP Computer Science A Study Guide (2026), two per lesson.
// Used with the author's permission. Copyright (c) 2026 Kevin Wellborn. They are shown after the CyberTeaches
// questions with a "From the book" tag. pre: optional text shown before the code (st).
window.AP_BOOK_QUESTIONS = {
 "1.1": [
  {
   "book": true,
   "q": "The code prints 20 instead of 15. Which of the following best describes the problem?",
   "a": [
    "A syntax error, because the compiler cannot evaluate x + y / 2",
    "A logic error, because the expression divides only y by 2",
    "A run-time error, because the program stops before printing",
    "An exception, because y / 2 is not allowed"
   ],
   "c": 1,
   "why": "Division happens before addition, so it computes 10 + 10. It runs but gives the wrong result.",
   "st": "int x = 10;\nint y = 20;\nSystem.out.println(x + y / 2);",
   "pre": "The following code segment is intended to print the average of x and y."
  },
  {
   "book": true,
   "q": "Which of the following best describes what happens?",
   "a": [
    "The code does not compile.",
    "0 is printed.",
    "50 is printed.",
    "The code compiles, but an ArithmeticException occurs when it runs."
   ],
   "c": 3,
   "why": "The code is legal, so it compiles. Dividing an int by zero throws the exception at run time.",
   "st": "int total = 50;\nint count = 0;\nSystem.out.println(total / count);",
   "pre": "Consider the following code segment."
  }
 ],
 "1.2": [
  {
   "book": true,
   "q": "Which of the following statements is true?",
   "a": [
    "x and y have the same data type because they hold equal numbers.",
    "z is a reference type because it does not hold a number.",
    "All three variables are reference types.",
    "All three variables are primitive types, and each has a different type."
   ],
   "c": 3,
   "why": "int, double, and boolean are all primitive. 3 and 3.0 are different types.",
   "st": "int x = 3;\ndouble y = 3.0;\nboolean z = true;",
   "pre": "Consider the following declarations."
  },
  {
   "book": true,
   "q": "A student uses int to store the average of a class's quiz scores. Which of the following best explains why double is the better choice?",
   "a": [
    "An int cannot hold numbers larger than 100.",
    "An average can have a fractional part, and an int can hold only integers.",
    "A double is a reference type, so it can hold any value.",
    "Variables of type int cannot change while the program runs."
   ],
   "c": 1,
   "why": "Averages can be values like 87.5. An int holds only integers."
  }
 ],
 "1.3": [
  {
   "book": true,
   "q": "What is printed as a result of executing the statement?",
   "a": [
    "0.0",
    "2",
    "2.0",
    "0"
   ],
   "c": 0,
   "why": "Left to right: 1 / 4 is the int 0, and 0 * 8.0 is the double 0.0.",
   "st": "System.out.println(1 / 4 * 8.0);"
  },
  {
   "book": true,
   "q": "What is the result of executing the code segment?",
   "a": [
    "0 is printed.",
    "12 is printed.",
    "The code does not compile.",
    "An ArithmeticException occurs."
   ],
   "c": 3,
   "why": "Dividing an int by the integer zero compiles but throws an ArithmeticException at run time.",
   "st": "int players = 12;\nint teams = 0;\nSystem.out.println(players / teams);"
  }
 ],
 "1.4": [
  {
   "book": true,
   "q": "What are the values of x and y after the code segment executes?",
   "a": [
    "x is 9 and y is 2",
    "x is 2 and y is 9",
    "x is 2 and y is 2",
    "x is 9 and y is 9"
   ],
   "c": 3,
   "why": "x = y overwrites the 2, so both are 9. A swap needs a temporary variable.",
   "st": "int x = 2;\nint y = 9;\nx = y;\ny = x;"
  },
  {
   "book": true,
   "q": "What is the value of c after the code segment executes?",
   "a": [
    "8",
    "10",
    "12",
    "12.5"
   ],
   "c": 1,
   "why": "10 / 4 is 2, 2 * 4 is 8, 10 % 4 is 2, and 8 + 2 = 10.",
   "st": "int a = 10;\nint b = 4;\nint c = a / b * b + a % b;"
  }
 ],
 "1.5": [
  {
   "book": true,
   "q": "What is the value of cents after the code segment executes? Ignore any round-off error.",
   "a": [
    "0",
    "0.75",
    "4.0",
    "75"
   ],
   "c": 1,
   "why": "dollars is 4. Then 4.75 - 4 widens 4 to 4.0 and gives 0.75.",
   "st": "double price = 4.75;\nint dollars = (int) price;\ndouble cents = price - dollars;"
  },
  {
   "book": true,
   "q": "Which of the following best describes the result of executing the code segment?",
   "a": [
    "The code does not compile.",
    "An exception is thrown when 1 is added.",
    "n is automatically changed to type double so the larger value fits.",
    "n holds a value in the int range that is not the mathematically expected result."
   ],
   "c": 3,
   "why": "Integer overflow gives an in-range but unexpected value, with no error or exception.",
   "st": "int n = Integer.MAX_VALUE;\nn = n + 1;"
  }
 ],
 "1.6": [
  {
   "book": true,
   "q": "What is the value of d after the code segment executes?",
   "a": [
    "3",
    "3.0",
    "3.5",
    "11.0"
   ],
   "c": 2,
   "why": "d is a double, so 10.0 / 4 is 2.5, and 2.5 + 1 is 3.5.",
   "st": "double d = 10;\nd /= 4;\nd += 1;"
  },
  {
   "book": true,
   "q": "What are the values of x and y after the code segment executes?",
   "a": [
    "x is 1 and y is 9",
    "x is 0 and y is 9",
    "x is 7 and y is 9",
    "x is 0 and y is 11"
   ],
   "c": 1,
   "why": "x is 7, y is 2 + 7 = 9, then 7 / 9 is 0 with integer division.",
   "st": "int x = 9;\nint y = 2;\nx -= y;\ny += x;\nx /= y;"
  }
 ],
 "1.7": [
  {
   "book": true,
   "q": "The documentation for a Circle class lists only these methods: double getRadius() and double getArea(). A programmer writes c.getDiameter() for a Circle object c. Which of the following is true?",
   "a": [
    "The call works, because a diameter can be computed from the radius.",
    "The call is not valid, because getDiameter is not part of the documented class.",
    "The call returns 0.",
    "The call works only if the radius is an integer."
   ],
   "c": 1,
   "why": "Only documented methods may be called. The programmer could use 2 * c.getRadius() instead."
  },
  {
   "book": true,
   "q": "What is the main reason programmers use classes from existing libraries?",
   "a": [
    "Library classes cannot contain errors.",
    "They save time, because the code is already written and tested.",
    "Programs are not allowed to define their own classes.",
    "Library classes do not need documentation."
   ],
   "c": 1,
   "why": "Reusing existing code is faster and more reliable than rewriting it."
  }
 ],
 "1.8": [
  {
   "book": true,
   "q": "What is the value of n after the code segment executes?",
   "a": [
    "6",
    "7",
    "13",
    "14"
   ],
   "c": 1,
   "why": "Only n += 4 runs. The other two statements are inside comments.",
   "st": "int n = 3;\nn += 4; // n *= 2;\n/* n -= 1; */"
  },
  {
   "book": true,
   "q": "What does the compiler do with comments?",
   "a": [
    "It runs them as statements.",
    "It ignores them.",
    "It prints them when the program runs.",
    "It reports them as errors."
   ],
   "c": 1,
   "why": "Comments are for people who read the code."
  }
 ],
 "1.9": [
  {
   "book": true,
   "q": "A method has the header public static double half(int n) and returns n / 2.0. What is the value of x after double x = half(5) + half(4); executes?",
   "a": [
    "4.0",
    "4.5",
    "5.0",
    "9.0"
   ],
   "c": 1,
   "why": "half(5) returns 2.5 and half(4) returns 2.0. Each returned value is used in the expression."
  },
  {
   "book": true,
   "q": "Which of the following best describes the difference between a parameter and an argument?",
   "a": [
    "A parameter is a variable in the method header; an argument is a value passed in the call.",
    "A parameter is a value passed in the call; an argument is a variable in the method header.",
    "A parameter is always an int; an argument can be any type.",
    "There is no difference; the words mean the same thing."
   ],
   "c": 0,
   "why": "Parameters are declared in the header. Arguments are the values passed when the method is called."
  }
 ],
 "1.10": [
  {
   "book": true,
   "q": "The method is defined in class M. What is the value of M.cube(2) + M.cube(3)?",
   "a": [
    "15",
    "35",
    "125",
    "216"
   ],
   "c": 1,
   "why": "M.cube(2) is 8 and M.cube(3) is 27, and 8 + 27 = 35.",
   "st": "public static int cube(int n)\n{\n    return n * n * n;\n}"
  },
  {
   "book": true,
   "q": "The method is defined in class Q. What is the value of Q.f(10, Q.f(6, 2))?",
   "a": [
    "2",
    "4",
    "6",
    "14"
   ],
   "c": 2,
   "why": "The inner call Q.f(6, 2) is 4, and Q.f(10, 4) is 6.",
   "st": "public static int f(int a, int b)\n{\n    return a - b;\n}"
  }
 ],
 "1.11": [
  {
   "book": true,
   "q": "What is the value of Math.pow(2, 4) - Math.pow(4, 2)?",
   "a": [
    "8.0",
    "-8.0",
    "0.0",
    "0"
   ],
   "c": 2,
   "why": "Both calls return 16.0, and the difference of two double values is a double."
  },
  {
   "book": true,
   "q": "Which expression produces a random integer from 0 to 9, inclusive?",
   "a": [
    "(int) Math.random() * 10",
    "(int) (Math.random() * 9)",
    "(int) (Math.random() * 10) + 1",
    "(int) (Math.random() * 10)"
   ],
   "c": 3,
   "why": "Math.random() * 10 is at least 0.0 and less than 10.0; the cast drops the fraction."
  }
 ],
 "1.12": [
  {
   "book": true,
   "q": "Vehicle is a superclass of Truck. Which statement is true?",
   "a": [
    "A Vehicle has every attribute of a Truck.",
    "A Truck has the attributes and behaviors of a Vehicle.",
    "Truck and Vehicle are unrelated.",
    "Vehicle is a subclass of Truck."
   ],
   "c": 1,
   "why": "A subclass inherits from its superclass."
  },
  {
   "book": true,
   "q": "How many objects can be created from one class?",
   "a": [
    "Exactly one",
    "At most two",
    "As many as the program needs",
    "None; classes do not create objects"
   ],
   "c": 2,
   "why": "Each object is a separate instance with its own attribute values."
  }
 ],
 "1.13": [
  {
   "book": true,
   "q": "How many Coin objects are created by the code segment?",
   "a": [
    "0",
    "1",
    "2",
    "3"
   ],
   "c": 2,
   "why": "new appears twice. Coin c = b copies a reference and creates no object.",
   "st": "Coin a = new Coin();\nCoin b = new Coin();\nCoin c = b;"
  },
  {
   "book": true,
   "q": "The Box constructor changes the value of its parameter to 99. What is the value of size after the code segment executes?",
   "a": [
    "0",
    "10",
    "99",
    "The code does not compile."
   ],
   "c": 1,
   "why": "Call by value: the parameter is a copy of size, so size is unchanged.",
   "st": "int size = 10;\nBox b = new Box(size);"
  }
 ],
 "1.14": [
  {
   "book": true,
   "q": "What are the values of a.getValue() and b.getValue() after the code segment executes?",
   "a": [
    "7 and 3",
    "7 and 7",
    "3 and 7",
    "3 and 3"
   ],
   "c": 0,
   "why": "a and b refer to different objects, so only a changes.",
   "st": "Counter a = new Counter(3);\nCounter b = new Counter(3);\na.increase(4);"
  },
  {
   "book": true,
   "q": "What is the value of a.getValue() after the code segment executes?",
   "a": [
    "3",
    "4",
    "7",
    "12"
   ],
   "c": 2,
   "why": "a and b refer to the same object, so the change made through b is seen through a.",
   "st": "Counter a = new Counter(3);\nCounter b = a;\nb.increase(4);"
  }
 ],
 "1.15": [
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "plan",
    "plane",
    "planet",
    "et"
   ],
   "c": 2,
   "why": "Strings are immutable, and the result of substring was not assigned.",
   "st": "String s = \"planet\";\ns.substring(0, 4);\nSystem.out.println(s);"
  },
  {
   "book": true,
   "q": "What is returned by \"hello\".indexOf(\"l\")?",
   "a": [
    "1",
    "2",
    "3",
    "4"
   ],
   "c": 1,
   "why": "indexOf returns the index of the first occurrence."
  }
 ],
 "2.1": [
  {
   "book": true,
   "q": "Consider the algorithm: Start with 1. Repeat 4 times: double the number. What is the final number?",
   "a": [
    "4",
    "8",
    "16",
    "32"
   ],
   "c": 2,
   "why": "The number becomes 2, 4, 8, and then 16."
  },
  {
   "book": true,
   "q": "Performing the steps of an algorithm one after another, in the order given, is called",
   "a": [
    "sequencing",
    "selection",
    "repetition",
    "abstraction"
   ],
   "c": 0,
   "why": "Sequencing is the order in which steps are carried out."
  }
 ],
 "2.2": [
  {
   "book": true,
   "q": "Which of the following best describes the code segment?",
   "a": [
    "done is assigned true.",
    "done is assigned false.",
    "done is assigned 30.",
    "The code does not compile, because = is assignment, not comparison."
   ],
   "c": 3,
   "why": "total = 30 produces an int, which cannot be stored in a boolean. The comparison operator is ==.",
   "st": "int total = 30;\nboolean done = total = 30;"
  },
  {
   "book": true,
   "q": "Assume double x = 2.5;. What is the value of x != 2.5?",
   "a": [
    "true",
    "false",
    "0.0",
    "2.5"
   ],
   "c": 1,
   "why": "x is equal to 2.5, so \"not equal\" is false."
  }
 ],
 "2.3": [
  {
   "book": true,
   "q": "A student expects c to be 0 only when c equals 10. Which of the following best describes the code?",
   "a": [
    "It works as the student expects.",
    "It does not compile.",
    "The semicolon ends the if statement, so c = 0 executes regardless of the condition.",
    "The body never executes."
   ],
   "c": 2,
   "why": "The semicolon makes the if body empty. The block below is not controlled by the if.",
   "st": "int c = 10;\nif (c == 10);\n{\n    c = 0;\n}"
  },
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "15",
    "20",
    "35",
    "5"
   ],
   "c": 1,
   "why": "15 > 20 is false, so big keeps the value 20. This is the \"larger of two values\" pattern.",
   "st": "int p = 20;\nint q = 15;\nint big = p;\nif (q > big)\n{\n    big = q;\n}\nSystem.out.println(big);"
  }
 ],
 "2.4": [
  {
   "book": true,
   "q": "A program should assign \"small\" when w is less than 10, \"medium\" when w is from 10 to 49, and \"large\" when w is 50 or more. Which condition should replace /* missing */?",
   "a": [
    "w > 10",
    "w >= 10",
    "w < 50",
    "w <= 50"
   ],
   "c": 2,
   "why": "When the second condition is reached, w is already at least 10. w < 50 separates medium from large.",
   "st": "if (w < 10)\n{\n    s = \"small\";\n}\nelse if ( /* missing */ )\n{\n    s = \"medium\";\n}\nelse\n{\n    s = \"large\";\n}"
  },
  {
   "book": true,
   "q": "Assume int a = 2; and int b = 9;. What are the values of a and b after the code segment executes?",
   "a": [
    "a is 0 and b is 9",
    "a is 0 and b is 0",
    "a is 2 and b is 9",
    "a is 2 and b is 0"
   ],
   "c": 3,
   "why": "The outer condition is false, so the inner if is never reached and the else runs.",
   "st": "if (a > 5)\n{\n    if (b > 5)\n    {\n        a = 0;\n    }\n}\nelse\n{\n    b = 0;\n}"
  }
 ],
 "2.5": [
  {
   "book": true,
   "q": "Assume int age = 16; and boolean permit = true;. What is the value of age >= 18 || permit && age >= 15?",
   "a": [
    "true",
    "false",
    "16",
    "The expression does not compile."
   ],
   "c": 0,
   "why": "&& is evaluated first: true && true. Then false || true is true."
  },
  {
   "book": true,
   "q": "Which expression is true exactly when the int variable n is not between 1 and 10, inclusive?",
   "a": [
    "n < 1 && n > 10",
    "n > 1 || n < 10",
    "n <= 1 || n >= 10",
    "n < 1 || n > 10"
   ],
   "c": 3,
   "why": "The value is either below 1 or above 10. It cannot be both, so && would never be true."
  }
 ],
 "2.6": [
  {
   "book": true,
   "q": "Which of the following is true?",
   "a": [
    "p == q is true and p.equals(q) is true.",
    "p == q is true and p.equals(q) is false.",
    "p == q is false and p.equals(q) is true.",
    "p == q is false and p.equals(q) is false."
   ],
   "c": 2,
   "why": "They are different objects with the same characters. equals compares the contents.",
   "st": "String p = new String(\"sun\");\nString q = new String(\"sun\");"
  },
  {
   "book": true,
   "q": "Which expression is equivalent to !(done || n > 0)?",
   "a": [
    "!done || n <= 0",
    "done && n > 0",
    "!done && n < 0",
    "!done && n <= 0"
   ],
   "c": 3,
   "why": "De Morgan's law: !(A || B) is !A && !B. The opposite of > is <=."
  }
 ],
 "2.7": [
  {
   "book": true,
   "q": "What is the value of v after the code segment executes?",
   "a": [
    "17",
    "20",
    "22",
    "27"
   ],
   "c": 2,
   "why": "v is 2, 7, 12, 17, 22. At 17 the test is still true, so the body runs once more.",
   "st": "int v = 2;\nwhile (v < 20)\n{\n    v += 5;\n}"
  },
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "5 3 1",
    "5 3 1 -1",
    "3 1 -1",
    "5 4 3 2 1"
   ],
   "c": 0,
   "why": "5, 3, and 1 pass the test. Then n is -1 and the loop ends.",
   "st": "int n = 5;\nwhile (n > 0)\n{\n    System.out.print(n + \" \");\n    n -= 2;\n}"
  }
 ],
 "2.8": [
  {
   "book": true,
   "q": "What is the value of r after the code segment executes?",
   "a": [
    "\"LOOP\"",
    "\"POOL\"",
    "\"P\"",
    "\"LOOPLOOP\""
   ],
   "c": 1,
   "why": "Each letter is placed in front of the letters already collected, which reverses the string.",
   "st": "String w = \"LOOP\";\nString r = \"\";\nfor (int i = 0; i < w.length(); i++)\n{\n    r = w.substring(i, i + 1) + r;\n}"
  },
  {
   "book": true,
   "q": "What is the value of count after the code segment executes?",
   "a": [
    "3",
    "4",
    "5",
    "16"
   ],
   "c": 1,
   "why": "i takes the values 1, 3, 9, and 27. The next value, 81, fails the test.",
   "st": "int count = 0;\nfor (int i = 1; i < 50; i *= 3)\n{\n    count++;\n}"
  }
 ],
 "2.9": [
  {
   "book": true,
   "q": "What is the value of r after the code segment executes?",
   "a": [
    "10",
    "1234",
    "4321",
    "0"
   ],
   "c": 2,
   "why": "Each step shifts r left one place and appends the next digit from the right of n.",
   "st": "int n = 1234;\nint r = 0;\nwhile (n > 0)\n{\n    r = r * 10 + n % 10;\n    n /= 10;\n}"
  },
  {
   "book": true,
   "q": "What is the value of max after the code segment executes?",
   "a": [
    "2",
    "3",
    "4",
    "5"
   ],
   "c": 2,
   "why": "The values of v are 2, 4, 1, 3, and 0. The largest is 4.",
   "st": "int max = 0;\nfor (int i = 1; i <= 5; i++)\n{\n    int v = (i * 7) % 5;\n    if (v > max)\n    {\n        max = v;\n    }\n}"
  }
 ],
 "2.10": [
  {
   "book": true,
   "q": "What is the value of total after the code segment executes?",
   "a": [
    "0",
    "3",
    "6",
    "9"
   ],
   "c": 1,
   "why": "indexOf returns -1 for the letters and an index of 0 or more for the three digits.",
   "st": "String s = \"a1b2c3\";\nString digits = \"0123456789\";\nint total = 0;\nfor (int i = 0; i < s.length(); i++)\n{\n    if (digits.indexOf(s.substring(i, i + 1)) >= 0)\n    {\n        total++;\n    }\n}"
  },
  {
   "book": true,
   "q": "What is the value of t after the code segment executes?",
   "a": [
    "\"abc\"",
    "\"ace\"",
    "\"bdf\"",
    "\"abcdef\""
   ],
   "c": 1,
   "why": "The loop visits indices 0, 2, and 4.",
   "st": "String s = \"abcdef\";\nString t = \"\";\nfor (int i = 0; i < s.length(); i += 2)\n{\n    t += s.substring(i, i + 1);\n}"
  }
 ],
 "2.11": [
  {
   "book": true,
   "q": "What is the value of total after the code segment executes?",
   "a": [
    "3",
    "6",
    "9",
    "27"
   ],
   "c": 2,
   "why": "Each pass of the inner loop adds 0 + 1 + 2 = 3, and it happens 3 times.",
   "st": "int total = 0;\nint i = 0;\nwhile (i < 3)\n{\n    for (int j = 0; j < 3; j++)\n    {\n        total += j;\n    }\n    i++;\n}"
  },
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "xxyy",
    "xyxy",
    "xy",
    "xxxx"
   ],
   "c": 0,
   "why": "For each character, the inner loop prints it twice before the outer loop moves on.",
   "st": "String s = \"xy\";\nfor (int i = 0; i < s.length(); i++)\n{\n    for (int k = 0; k < 2; k++)\n    {\n        System.out.print(s.substring(i, i + 1));\n    }\n}"
  }
 ],
 "2.12": [
  {
   "book": true,
   "q": "How many times is the statement c++ executed?",
   "a": [
    "5",
    "10",
    "49",
    "50"
   ],
   "c": 0,
   "why": "The condition is true only for 10, 20, 30, 40, and 50.",
   "st": "int c = 0;\nfor (int i = 1; i <= 50; i++)\n{\n    if (i % 10 == 0)\n    {\n        c++;\n    }\n}"
  },
  {
   "book": true,
   "q": "What is the value of steps after the code segment executes?",
   "a": [
    "5",
    "6",
    "7",
    "32"
   ],
   "c": 1,
   "why": "n goes 64, 32, 16, 8, 4, 2, 1. The body runs 6 times.",
   "st": "int n = 64;\nint steps = 0;\nwhile (n > 1)\n{\n    n /= 2;\n    steps++;\n}"
  }
 ],
 "3.1": [
  {
   "book": true,
   "q": "Many classes call a method named computeTax without knowing how it is written. This is an example of",
   "a": [
    "procedural abstraction",
    "an instance variable",
    "a syntax error",
    "data collection"
   ],
   "c": 0,
   "why": "A method can be used by knowing what it does, not how it does it."
  },
  {
   "book": true,
   "q": "Which of the following is an attribute of a Dog class, not a behavior?",
   "a": [
    "bark",
    "fetch",
    "weight",
    "eat"
   ],
   "c": 2,
   "why": "An attribute is data; the others are actions."
  }
 ],
 "3.2": [
  {
   "book": true,
   "q": "",
   "a": [
    "perform its tasks as expected under stated conditions without failure",
    "run faster than other programs",
    "use the smallest possible amount of memory",
    "be written in the fewest lines of code"
   ],
   "c": 0,
   "why": "Reliability is about performing as expected without failure.",
   "st": "System reliability refers to a program's ability to"
  },
  {
   "book": true,
   "q": "A program passes all of its programmer's tests but fails for users whose names contain accented letters. What does this show?",
   "a": [
    "The users entered their names incorrectly.",
    "The program has a syntax error.",
    "Testing is not useful.",
    "A program should be tested with a wide variety of inputs."
   ],
   "c": 3,
   "why": "Tests should represent all the people who will use the program."
  }
 ],
 "3.3": [
  {
   "book": true,
   "q": "Which is the most appropriate declaration of an instance variable in this course?",
   "a": [
    "public double price;",
    "double private price;",
    "private double price;",
    "private price double;"
   ],
   "c": 2,
   "why": "The order is access, then type, then name, and instance variables are private."
  },
  {
   "book": true,
   "q": "Which statement best describes the relationship between a class and an object?",
   "a": [
    "An object is a blueprint for a class.",
    "A class is a blueprint; an object is one instance made from it.",
    "A class can have only one object.",
    "They are two names for the same thing."
   ],
   "c": 1,
   "why": "Many objects can be created from one class."
  }
 ],
 "3.4": [
  {
   "book": true,
   "q": "What is the default value of an instance variable of type double?",
   "a": [
    "null",
    "0.0",
    "1.0",
    "It has no value until it is assigned."
   ],
   "c": 1,
   "why": "Numeric instance variables start at zero."
  },
  {
   "book": true,
   "q": "When is a constructor executed?",
   "a": [
    "When the class is compiled",
    "When an object is created with new",
    "Each time a method of the object is called",
    "When the program ends"
   ],
   "c": 1,
   "why": "The constructor runs once for each object, to set its initial state."
  }
 ],
 "3.5": [
  {
   "book": true,
   "q": "What is returned by the call test(6)?",
   "a": [
    "1",
    "2",
    "3",
    "12"
   ],
   "c": 1,
   "why": "6 is not greater than 10. n becomes 12, so the second if returns 2.",
   "st": "public static int test(int n)\n{\n    if (n > 10)\n    {\n        return 1;\n    }\n    n = n * 2;\n    if (n > 10)\n    {\n        return 2;\n    }\n    return 3;\n}"
  },
  {
   "book": true,
   "q": "What is returned by the call find(10)?",
   "a": [
    "-1",
    "4",
    "5",
    "10"
   ],
   "c": 2,
   "why": "4 * 4 is 16, which is not greater than 20. 5 * 5 is 25, so the method returns 5 and the loop stops.",
   "st": "public static int find(int limit)\n{\n    for (int i = 1; i <= limit; i++)\n    {\n        if (i * i > 20)\n        {\n            return i;\n        }\n    }\n    return -1;\n}"
  }
 ],
 "3.6": [
  {
   "book": true,
   "q": "The method getOwner() of a Pet object returns the Person reference stored in its instance variable. A client executes Person a = pet.getOwner(); Person b = pet.getOwner();. What is the value of a == b?",
   "a": [
    "true, because both hold the same reference",
    "false, because each call returns a new copy",
    "false, because == cannot compare objects",
    "It does not compile."
   ],
   "c": 0,
   "why": "Each call returns the same reference, not a new object."
  },
  {
   "book": true,
   "q": "A client executes String x = \"L\"; String y = \"R\"; swap(x, y); System.out.println(x + y);. What is printed?",
   "a": [
    "LR",
    "RL",
    "LL",
    "RR"
   ],
   "c": 0,
   "why": "The method swaps only its own parameters. The caller's variables are unchanged.",
   "st": "public static void swap(String a, String b)\n{\n    String temp = a;\n    a = b;\n    b = temp;\n}",
   "pre": "Consider the following method."
  }
 ],
 "3.7": [
  {
   "book": true,
   "q": "After Cup a = new Cup(); Cup b = new Cup(); Cup c = b; executes, what is returned by Cup.getN()?",
   "a": [
    "0",
    "1",
    "2",
    "3"
   ],
   "c": 2,
   "why": "Only two objects were constructed. Cup c = b; copies a reference and calls no constructor.",
   "st": "public class Cup\n{\n    private static int n = 0;\n    public Cup() { n++; }\n    public static int getN() { return n; }\n}",
   "pre": "Consider the following class."
  },
  {
   "book": true,
   "q": "The class Counter has public static int count;, and its constructor does not change count. What is the value of Counter.count after Counter.count = 5; Counter c = new Counter(); Counter.count += 2; executes?",
   "a": [
    "0",
    "2",
    "5",
    "7"
   ],
   "c": 3,
   "why": "There is one copy of count, and creating an object does not reset it."
  }
 ],
 "3.8": [
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "5",
    "10",
    "11",
    "Nothing; a compile-time error occurs."
   ],
   "c": 2,
   "why": "x is declared outside the block and can be changed inside it. y is used only inside its block.",
   "st": "int x = 5;\nif (x > 2)\n{\n    int y = x * 2;\n    x = y + 1;\n}\nSystem.out.println(x);"
  },
  {
   "book": true,
   "q": "A constructor has the header public Car(String model) and the body model = model;. The class has an instance variable private String model;. After new Car(\"Z\"), the instance variable model is",
   "a": [
    "\"Z\"",
    "\"\"",
    "null",
    "\"model\""
   ],
   "c": 2,
   "why": "Both names in the assignment refer to the parameter, so the instance variable keeps its default."
  }
 ],
 "3.9": [
  {
   "book": true,
   "q": "What is returned by new Tag(42).getId()?",
   "a": [
    "42",
    "0",
    "null",
    "The code does not compile."
   ],
   "c": 1,
   "why": "The parameter is assigned to itself. The instance variable keeps the default value 0.",
   "st": "public class Tag\n{\n    private int id;\n    public Tag(int id) { id = id; }\n    public int getId() { return id; }\n}"
  },
  {
   "book": true,
   "q": "An instance variable is named count, and no parameter or local variable has that name. Inside an instance method, is this. required in order to use it?",
   "a": [
    "Yes, always",
    "No; count and this.count mean the same thing",
    "Yes, but only in a constructor",
    "No, and this.count would be an error"
   ],
   "c": 1,
   "why": "this. is needed only when a local name hides the instance variable."
  }
 ],
 "4.1": [
  {
   "book": true,
   "q": "Which of the following is personally identifiable information?",
   "a": [
    "The average age of the people in a city",
    "The number of visitors to a website",
    "A person's home address",
    "The total rainfall in a year"
   ],
   "c": 2,
   "why": "It can be used to identify one specific person."
  },
  {
   "book": true,
   "q": "Data about a city's commuters is collected only at noon on weekdays. Conclusions about all commuters may be",
   "a": [
    "inaccurate, because the sample does not represent everyone",
    "more accurate, because the data is consistent",
    "accurate, because noon is the middle of the day",
    "unaffected by how the data was collected"
   ],
   "c": 0,
   "why": "How data is collected can introduce bias."
  }
 ],
 "4.2": [
  {
   "book": true,
   "q": "A data set contains 4, 9, 2, 9, 5. An algorithm counts the values that are greater than 4. What is the result?",
   "a": [
    "2",
    "3",
    "4",
    "5"
   ],
   "c": 1,
   "why": "The values 9, 9, and 5 are counted."
  },
  {
   "book": true,
   "q": "To compute the average of a data set, an algorithm needs which two results?",
   "a": [
    "The largest value and the smallest value",
    "The first value and the last value",
    "The number of values and the largest value",
    "The sum of the values and the number of values"
   ],
   "c": 3,
   "why": "The average is the sum divided by the count."
  }
 ],
 "4.3": [
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "3",
    "50",
    "0",
    "2"
   ],
   "c": 1,
   "why": "y is an alias for the same array, so the change is seen through x.",
   "st": "int[] x = {1, 2, 3};\nint[] y = x;\ny[2] = 50;\nSystem.out.println(x[2]);"
  },
  {
   "book": true,
   "q": "What is the value of c after the code segment executes?",
   "a": [
    "2",
    "3",
    "6",
    "7"
   ],
   "c": 2,
   "why": "flags[0] and flags[3] are the default false; flags[1] is true. 2 + 4 = 6.",
   "st": "boolean[] flags = new boolean[4];\nflags[1] = true;\nint c = 0;\nif (flags[0]) { c += 1; }\nif (flags[1]) { c += 2; }\nif (!flags[3]) { c += 4; }"
  }
 ],
 "4.4": [
  {
   "book": true,
   "q": "What is the value of t after the code segment executes?",
   "a": [
    "21",
    "44",
    "56",
    "108"
   ],
   "c": 1,
   "why": "2 × 1 + 4 × 3 + 6 × 5 = 2 + 12 + 30 = 44.",
   "st": "int[] a = {2, 4, 6};\nint[] b = {1, 3, 5};\nint t = 0;\nfor (int i = 0; i < a.length; i++)\n{\n    t += a[i] * b[i];\n}"
  },
  {
   "book": true,
   "q": "What are the contents of a after the code segment executes?",
   "a": [
    "{1, 2, 2, 2}",
    "{2, 4, 8, 16}",
    "{1, 2, 4, 8}",
    "{1, 1, 2, 4}"
   ],
   "c": 2,
   "why": "Each element becomes twice the element just before it, which was already updated.",
   "st": "int[] a = {1, 1, 1, 1};\nfor (int i = 1; i < a.length; i++)\n{\n    a[i] = a[i - 1] * 2;\n}"
  }
 ],
 "4.5": [
  {
   "book": true,
   "q": "What is the value of n after the code segment executes?",
   "a": [
    "2",
    "3",
    "4",
    "5"
   ],
   "c": 1,
   "why": "Equal neighbors: 5 and 5, 3 and 3, 3 and 3.",
   "st": "int[] a = {2, 5, 5, 3, 3, 3};\nint n = 0;\nfor (int i = 0; i < a.length - 1; i++)\n{\n    if (a[i] == a[i + 1]) { n++; }\n}"
  },
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "20",
    "20.0",
    "60",
    "30"
   ],
   "c": 0,
   "why": "The sum is 60 and 60 / 3 is the int 20.",
   "st": "int[] a = {10, 20, 30};\nint s = 0;\nfor (int v : a) { s += v; }\nSystem.out.println(s / a.length);"
  }
 ],
 "4.6": [
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "2green",
    "3green",
    "3red",
    "14green"
   ],
   "c": 1,
   "why": "The string splits into three pieces, and c[1] is the second piece.",
   "st": "String s = \"red,green,blue\";\nString[] c = s.split(\",\");\nSystem.out.println(c.length + c[1]);"
  },
  {
   "book": true,
   "q": "What is the value of r after the code segment executes?",
   "a": [
    "\"abcd\"",
    "\"dcba\"",
    "\"d c b a\"",
    "\"a b c d\""
   ],
   "c": 1,
   "why": "The four pieces are joined from last to first, with no spaces.",
   "st": "String t = \"a b c d\";\nString[] parts = t.split(\" \");\nString r = \"\";\nfor (int i = parts.length - 1; i >= 0; i--)\n{\n    r += parts[i];\n}"
  }
 ],
 "4.7": [
  {
   "book": true,
   "q": "What value does c hold after the code segment executes?",
   "a": [
    "12",
    "18",
    "24",
    "6"
   ],
   "c": 1,
   "why": "b is 12, and 12 + 6 is 18.",
   "st": "Integer a = 6;\nint b = a * 2;\nInteger c = b + a;"
  },
  {
   "book": true,
   "q": "What is printed as a result of executing the code segment?",
   "a": [
    "14",
    "842",
    "122",
    "84"
   ],
   "c": 1,
   "why": "The division 8 / 4 = 2 happens first, then \"8\" + \"4\" + 2 is concatenated.",
   "st": "String s = \"8\";\nString t = \"4\";\nSystem.out.println(s + t\n+ Integer.parseInt(s) / Integer.parseInt(t));"
  }
 ],
 "4.8": [
  {
   "book": true,
   "q": "The list nums contains [4, 7, 9, 2]. After nums.remove(1); executes, what is returned by nums.get(1)?",
   "a": [
    "4",
    "7",
    "9",
    "2"
   ],
   "c": 2,
   "why": "After 7 is removed, later elements move left: [4, 9, 2]."
  },
  {
   "book": true,
   "q": "What does v contain after the code segment executes?",
   "a": [
    "[2, 3, 4]",
    "[1, 2, 3]",
    "[2, 3, 5]",
    "[1, 2, 3, 4]"
   ],
   "c": 0,
   "why": "1 + 3 = 4 is appended, then the element at index 0 is removed.",
   "st": "ArrayList<Integer> v = new ArrayList<Integer>();\nv.add(1);\nv.add(2);\nv.add(3);\nv.add(v.get(0) + v.get(2));\nv.remove(0);"
  }
 ],
 "4.9": [
  {
   "book": true,
   "q": "What does a contain after the code segment executes?",
   "a": [
    "[5, 6, 7]",
    "[10, 12, 14]",
    "[10, 6, 7]",
    "[]"
   ],
   "c": 0,
   "why": "Assigning to the enhanced for loop variable does not change the list.",
   "st": "ArrayList<Integer> a = new ArrayList<Integer>();\na.add(5); a.add(6); a.add(7);\nfor (int x : a)\n{\n    x = x * 2;\n}"
  },
  {
   "book": true,
   "q": "What does a contain after the code segment executes?",
   "a": [
    "[4]",
    "[4, 9]",
    "[9, 4]",
    "[]"
   ],
   "c": 0,
   "why": "A backward traversal removes every 9 without skipping.",
   "st": "ArrayList<Integer> a = new ArrayList<Integer>();\na.add(9); a.add(4); a.add(9); a.add(9);\nfor (int i = a.size() - 1; i >= 0; i--)\n{\n    if (a.get(i) == 9) { a.remove(i); }\n}"
  }
 ],
 "4.10": [
  {
   "book": true,
   "q": "Assume list is an ArrayList<Integer> with the contents shown. What does it contain after the loop?",
   "a": [
    "[7, 10, 8]",
    "[7, 15, 8]",
    "[7, 10]",
    "[5, 7, 10]"
   ],
   "c": 0,
   "why": "Index 0 becomes 5 + 2 and index 1 becomes 2 + 8. The last element is unchanged.",
   "st": "// list contains [5, 2, 8]\nfor (int i = 0; i < list.size() - 1; i++)\n{\n    list.set(i, list.get(i) + list.get(i + 1));\n}"
  },
  {
   "book": true,
   "q": "Assume list is an ArrayList<Integer> with the contents shown. What does it contain after the loop?",
   "a": [
    "[1, 3, 5]",
    "[2, 4]",
    "[2, 3, 4]",
    "[]"
   ],
   "c": 1,
   "why": "The backward traversal removes every odd value.",
   "st": "// list contains [1, 2, 3, 4, 5]\nfor (int i = list.size() - 1; i >= 0; i--)\n{\n    if (list.get(i) % 2 == 1) { list.remove(i); }\n}"
  }
 ],
 "4.11": [
  {
   "book": true,
   "q": "What is the value of m[2][0] + m[0][2]?",
   "a": [
    "5",
    "6",
    "7",
    "8"
   ],
   "c": 1,
   "why": "m[2][0] is 2 and m[0][2] is 4.",
   "st": "int[][] m = { {3, 1, 4}, {1, 5, 9}, {2, 6, 5} };"
  },
  {
   "book": true,
   "q": "What is the value of d[1][1]?",
   "a": [
    "0.0",
    "0",
    "null",
    "1.1"
   ],
   "c": 0,
   "why": "Elements of a new double array are initialized to 0.0.",
   "st": "double[][] d = new double[2][3];"
  }
 ],
 "4.12": [
  {
   "book": true,
   "q": "What is the value of a[1][1] after the code segment executes?",
   "a": [
    "0",
    "2",
    "4",
    "5"
   ],
   "c": 3,
   "why": "Assigning to the enhanced for loop variable does not change the array.",
   "st": "int[][] a = { {1, 2, 3}, {4, 5, 6} };\nfor (int[] row : a)\n{\n    for (int v : row)\n    {\n        v = 0;\n    }\n}"
  },
  {
   "book": true,
   "q": "What is the value of n after the code segment executes?",
   "a": [
    "9",
    "12",
    "21",
    "3"
   ],
   "c": 1,
   "why": "The even elements are 2, 4, and 6.",
   "st": "int[][] a = { {1, 2, 3}, {4, 5, 6} };\nint n = 0;\nfor (int r = 0; r < a.length; r++)\n{\n    for (int c = 0; c < a[0].length; c++)\n    {\n        if (a[r][c] % 2 == 0) { n += a[r][c]; }\n    }\n}"
  }
 ],
 "4.13": [
  {
   "book": true,
   "q": "What is the value of a[0][1] after the code segment executes?",
   "a": [
    "2",
    "4",
    "5",
    "6"
   ],
   "c": 3,
   "why": "Rows 0 and 2 are swapped, so row 0 is now {5, 6}.",
   "st": "int[][] a = { {1, 2}, {3, 4}, {5, 6} };\nint[] t = a[0];\na[0] = a[2];\na[2] = t;"
  },
  {
   "book": true,
   "q": "What is the value of m after the code segment executes?",
   "a": [
    "3",
    "7",
    "8",
    "2"
   ],
   "c": 2,
   "why": "Only column 1 (8, 1, 2) is compared with the starting value 3.",
   "st": "int[][] a = { {3, 8}, {6, 1}, {7, 2} };\nint m = a[0][0];\nfor (int r = 0; r < a.length; r++)\n{\n    if (a[r][1] > m) { m = a[r][1]; }\n}"
  }
 ],
 "4.14": [
  {
   "book": true,
   "q": "A linear search method has the return type boolean. What should it return when the target is not found?",
   "a": [
    "false",
    "-1",
    "null",
    "0"
   ],
   "c": 0,
   "why": "The \"not found\" result matches the return type."
  },
  {
   "book": true,
   "q": "An ArrayList has 50 elements, and the target is the last element. How many elements does a linear search from the front compare with the target?",
   "a": [
    "1",
    "25",
    "49",
    "50"
   ],
   "c": 3,
   "why": "Every element is checked, including the last one."
  }
 ],
 "4.15": [
  {
   "book": true,
   "q": "After three passes of insertion sort on an array of 10 elements, which statement must be true?",
   "a": [
    "The three smallest elements of the whole array are at the front.",
    "The first four elements are the original first four elements, in sorted order.",
    "The last three elements are in their final positions.",
    "The entire array is sorted."
   ],
   "c": 1,
   "why": "Insertion sort has processed only the first four elements."
  },
  {
   "book": true,
   "q": "For which input does insertion sort do the least work?",
   "a": [
    "An array in reverse order",
    "An array in random order",
    "An array that is already sorted",
    "All inputs take the same work."
   ],
   "c": 2,
   "why": "Each element is already in place, so no shifting occurs."
  }
 ],
 "4.16": [
  {
   "book": true,
   "q": "What is returned by the call c(4096)?",
   "a": [
    "1",
    "3",
    "4",
    "19"
   ],
   "c": 2,
   "why": "The method counts digits: 4096, 409, 40, 4.",
   "st": "public static int c(int n)\n{\n    if (n < 10) { return 1; }\n    return 1 + c(n / 10);\n}"
  },
  {
   "book": true,
   "q": "What is returned by the call h(5)?",
   "a": [
    "5",
    "7",
    "8",
    "13"
   ],
   "c": 2,
   "why": "h(1) = 1, h(2) = 2, h(3) = 3, h(4) = 5, h(5) = 8.",
   "st": "public static int h(int n)\n{\n    if (n <= 2) { return n; }\n    return h(n - 1) + h(n - 2);\n}"
  }
 ],
 "4.17": [
  {
   "book": true,
   "q": "What is returned by the call len(\"java\")?",
   "a": [
    "0",
    "3",
    "4",
    "5"
   ],
   "c": 2,
   "why": "Each call counts one character and recurs on the rest of the string.",
   "st": "public static int len(String s)\n{\n    if (s.equals(\"\")) { return 0; }\n    return 1 + len(s.substring(1));\n}"
  },
  {
   "book": true,
   "q": "A sorted array has 100 elements. After the first comparison of a binary search does not find the target, about how many elements are still possible locations?",
   "a": [
    "99",
    "50",
    "10",
    "1"
   ],
   "c": 1,
   "why": "Each comparison removes about half of the remaining elements."
  }
 ]
};

(window.AP_UNITS || []).forEach(u => u.topics.forEach(t => { const b = window.AP_BOOK_QUESTIONS[t.id]; if (b) t.quiz = (t.quiz || []).concat(b); }));
