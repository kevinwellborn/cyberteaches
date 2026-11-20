/* AP CSA Practice Exam 1 (cyberteaches.com/apcsa/exam/1/)
   Every question, program and scenario here is original CyberTeaches material.
   Question fields:
     id     question number
     topic  course topic id, e.g. "2.8" (links to /apcsa/#/topic/2.8)
     stem   HTML
     code   optional Java code shown under the stem
     opts   4 answer choices (strings; shown as code when they look like code)
     ans    "A"-"D"
     run    optional check used by tools/check-apcsa-exams.js: 1 = run code as the body of main,
            or {pre, main}. The printed output must equal the correct choice.
   Free-response fields: q (title), intro (HTML), code (given Java), parts [{label, prompt, pts:[...], sample}] */
window.CSA_EXAM = {
id: "exam-1", num: 1,
name: "AP CSA Practice Exam 1",
questions: [
/* ---------- Unit 1 ---------- */
{ id:1, topic:"1.3", stem:"What is printed as a result of executing the following code segment?", code:`System.out.println(23 / 4 + 23 % 4 * 2);`, opts:["11","5.75","17","8"], ans:"A", run:1,
  expl:"23 / 4 is integer division, which gives 5. 23 % 4 is 3, and 3 * 2 is 6 because * and % come before +. 5 + 6 = 11." },
{ id:2, topic:"1.5", stem:"Consider the following code segment.", code:`double d = 9.7;
int n = (int) d + (int) (d + 0.5);
System.out.println(n);`, stemAfter:"What is printed as a result of executing the code segment?", opts:["18","19","20","19.4"], ans:"B", run:1,
  expl:"(int) d truncates 9.7 to 9. (int) (d + 0.5) is (int) 10.2, which is 10. 9 + 10 = 19." },
{ id:3, topic:"1.15", stem:"What is printed as a result of executing the following code segment?", code:`String s = "programming";
System.out.println(s.substring(3, 7) + s.indexOf("g"));`, opts:["gram3","gramm3","ogra3","gram10"], ans:"A", run:1,
  expl:"Indexes 3 through 6 are g, r, a, m, so substring(3, 7) is \"gram\". The first \"g\" is at index 3. Joining a String and an int gives \"gram3\"." },
{ id:4, topic:"1.13", stem:"Consider the following class and code segment.", code:`public class Lamp
{
    private boolean on;   // false when created

    public void toggle()  { on = !on; }
    public boolean isOn() { return on; }
}

Lamp a = new Lamp();
Lamp b = a;
Lamp c = new Lamp();
a.toggle();
b.toggle();
c.toggle();
System.out.println(a.isOn() + " " + c.isOn());`, stemAfter:"What is printed as a result of executing the code segment?", opts:["true true","false true","true false","false false"], ans:"B",
  run:{pre:"static class Lamp { private boolean on; public void toggle(){ on = !on; } public boolean isOn(){ return on; } }", main:`Lamp a = new Lamp(); Lamp b = a; Lamp c = new Lamp(); a.toggle(); b.toggle(); c.toggle(); System.out.println(a.isOn() + " " + c.isOn());`},
  expl:"a and b refer to the same Lamp object, so that one lamp is toggled twice and ends up false. c is a different object that is toggled once, so it is true." },
{ id:5, topic:"1.11", stem:"Which of the following expressions evaluates to a random integer from 10 to 20, inclusive?", opts:["(int) (Math.random() * 20) + 10","(int) (Math.random() * 11) + 10","(int) (Math.random() * 10) + 10","(int) Math.random() * 11 + 10"], ans:"B",
  expl:"There are 11 integers from 10 to 20. Math.random() * 11 gives 0.0 up to (but not including) 11.0, the cast gives 0 to 10, and adding 10 gives 10 to 20. In choice D, (int) Math.random() is always 0." },
{ id:6, topic:"1.9", stem:"A class contains the following method.", code:`public static double scale(int factor, double value)`, stemAfter:"Which of the following statements will compile without error?", opts:["double r = scale(3, 4);","int r = scale(3, 4.5);","double r = scale(3.0, 4.5);","double r = scale(\"3\", 4.5);"], ans:"A",
  expl:"The int 4 is automatically widened to the double parameter, and the double return value is stored in a double. B stores a double in an int, C passes a double where an int is required, and D passes a String." },
{ id:7, topic:"1.6", stem:"What is printed as a result of executing the following code segment?", code:`int x = 5;
x *= 2 + 3;
System.out.println(x);`, opts:["13","15","25","10"], ans:"C", run:1,
  expl:"A compound assignment evaluates the whole right side first: x = x * (2 + 3) = 5 * 5 = 25." },
{ id:8, topic:"1.15", stem:"Which of the following expressions evaluates to <code>true</code>?", opts:["\"cat\".equals(\"Cat\")","\"dog\".compareTo(\"cat\") > 0","\"apple\".length() == 4","\"hello\".indexOf(\"z\") == 0"], ans:"B",
  expl:"\"dog\" comes after \"cat\" in alphabetical order, so compareTo returns a positive number. equals is case sensitive, \"apple\" has 5 characters, and indexOf returns -1 when the text is not found." },
{ id:9, topic:"1.5", stem:"What is printed as a result of executing the following code segment?", code:`int big = Integer.MAX_VALUE;
big = big + 1;
System.out.println(big < 0);`, opts:["true","false","Nothing is printed because the code does not compile.","Nothing is printed because an ArithmeticException is thrown."], ans:"A", run:1,
  expl:"Adding 1 to Integer.MAX_VALUE causes integer overflow. Java does not throw an exception; the value wraps around to Integer.MIN_VALUE, which is negative." },

/* ---------- Unit 2 ---------- */
{ id:10, topic:"2.3", stem:"What is printed as a result of executing the following code segment?", code:`int a = 7;
if (a > 5)
{
    a -= 3;
}
else
{
    a += 3;
}
if (a > 5)
{
    a *= 2;
}
System.out.println(a);`, opts:["4","8","10","20"], ans:"A", run:1,
  expl:"7 > 5, so a becomes 4. The second if checks 4 > 5, which is false, so a stays 4." },
{ id:11, topic:"2.5", stem:"What is printed as a result of executing the following code segment?", code:`int x = 0;
if (x != 0 && 10 / x > 1)
{
    System.out.print("A");
}
else
{
    System.out.print("B");
}`, opts:["A","B","AB","Nothing is printed because an ArithmeticException is thrown."], ans:"B", run:1,
  expl:"x != 0 is false, so short-circuit evaluation skips 10 / x. The whole condition is false and B is printed. No division by zero happens." },
{ id:12, topic:"2.6", stem:"Which of the following is equivalent to <code>!(x &lt; 3 || y &gt;= 7)</code> for all int values of <code>x</code> and <code>y</code>?", opts:["x >= 3 && y < 7","x > 3 && y < 7","x >= 3 || y < 7","x < 3 && y >= 7"], ans:"A",
  expl:"By De Morgan's law, !(p || q) is !p && !q. The opposite of x < 3 is x >= 3, and the opposite of y >= 7 is y < 7." },
{ id:13, topic:"2.7", stem:"What is printed as a result of executing the following code segment?", code:`int n = 100;
int count = 0;
while (n > 1)
{
    n /= 3;
    count++;
}
System.out.println(count);`, opts:["3","4","5","33"], ans:"B", run:1,
  expl:"n takes the values 33, 11, 3, and 1. The loop body runs 4 times, then 1 > 1 is false." },
{ id:14, topic:"2.8", stem:"What is printed as a result of executing the following code segment?", code:`for (int k = 10; k > 0; k -= 3)
{
    System.out.print(k + " ");
}`, opts:["10 7 4 1","10 7 4","10 7 4 1 -2","7 4 1"], ans:"A", run:1,
  expl:"k is 10, 7, 4, then 1. The next value, -2, fails k > 0, so the loop ends." },
{ id:15, topic:"2.11", stem:"Consider the following code segment.", code:`int count = 0;
for (int i = 0; i < 5; i++)
{
    for (int j = i; j < 5; j += 2)
    {
        count++;
    }
}
System.out.println(count);`, stemAfter:"What is printed as a result of executing the code segment?", opts:["9","10","15","25"], ans:"A", run:1,
  expl:"The inner loop runs 3 times when i is 0 (j = 0, 2, 4), 2 times when i is 1 (1, 3), 2 times when i is 2 (2, 4), and once each when i is 3 and 4. 3 + 2 + 2 + 1 + 1 = 9." },
{ id:16, topic:"2.10", stem:"What is printed as a result of executing the following code segment?", code:`String w = "computer";
String r = "";
for (int i = w.length() - 1; i >= 0; i -= 2)
{
    r += w.substring(i, i + 1);
}
System.out.println(r);`, opts:["rtpo","retu","cmue","rtp"], ans:"A", run:1,
  expl:"The loop visits indexes 7, 5, 3, and 1, which hold r, t, p, and o." },
{ id:17, topic:"2.9", stem:"Consider the following method.", code:`public static int mystery(int n)
{
    int r = 0;
    while (n > 0)
    {
        r = r * 10 + n % 10;
        n /= 10;
    }
    return r;
}`, stemAfter:"What value is returned by the call <code>mystery(1230)</code>?", opts:["321","1230","3210","6"], ans:"A",
  run:{pre:"static int mystery(int n){ int r = 0; while (n > 0){ r = r * 10 + n % 10; n /= 10; } return r; }", main:"System.out.println(mystery(1230));"},
  expl:"The method reverses the digits. The digits come off as 0, 3, 2, 1, building 0, 3, 32, 321. The leading zero disappears, so 321 is returned." },
{ id:18, topic:"2.12", stem:"Consider the following code segment, where <code>n</code> is 6.", code:`for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= i; j++)
    {
        System.out.print("*");
    }
}`, stemAfter:"How many asterisks are printed?", opts:["6","15","21","36"], ans:"C", run:{pre:"", main:`int n = 6; int c = 0; for (int i = 1; i <= n; i++) for (int j = 1; j <= i; j++) c++; System.out.println(c);`},
  expl:"The inner loop runs i times, so the total is 1 + 2 + 3 + 4 + 5 + 6 = 21." },
{ id:19, topic:"2.4", stem:"Consider the following code segment, where <code>t</code> is an int.", code:`if (t >= 60)
{
    System.out.println("warm");
}
else if (t >= 80)
{
    System.out.println("hot");
}
else
{
    System.out.println("cold");
}`, stemAfter:"Which of the following best describes the behavior of this code segment?", opts:["\"hot\" is printed when t is at least 80.","\"hot\" is never printed for any value of t.","\"warm\" and \"hot\" are both printed when t is at least 80.","\"cold\" is never printed for any value of t."], ans:"B",
  expl:"Any value that is at least 80 is also at least 60, so the first branch runs and the else if is skipped. The branch that prints \"hot\" can never be reached. Values below 60 still print \"cold\"." },
{ id:20, topic:"2.5", stem:"Which of the following Boolean expressions is <code>true</code> exactly when the int variable <code>n</code> is a positive even number?", opts:["n > 0 && n % 2 == 0","n > 0 || n % 2 == 0","n >= 0 && n % 2 == 0","n > 0 && n % 2 == 1"], ans:"A",
  expl:"Both conditions must hold, so && is needed. n >= 0 would also accept 0, which is not positive." },
{ id:21, topic:"2.7", stem:"The following code segment is intended to stop after <code>k</code> passes 10, but it never ends.", code:`int k = 1;
while (k != 10)
{
    k += 2;
}`, stemAfter:"Which change makes the loop end?", opts:["Change k != 10 to k < 10","Change k += 2 to k += 4","Change int k = 1 to int k = 3","Change k += 2 to k -= 2"], ans:"A",
  expl:"k is always odd (1, 3, 5, ...), so it never equals 10. With k < 10 the loop stops as soon as k reaches 11. In choices B, C, and D, k still never equals 10, so those loops never end." },
{ id:22, topic:"2.4", stem:"What is printed as a result of executing the following code segment?", code:`int x = 3;
int y = 8;
if (x > 5)
    if (y > 5)
        System.out.print("A");
else
    System.out.print("B");
System.out.print("C");`, opts:["C","BC","AC","B"], ans:"A", run:1,
  expl:"Without braces, the else belongs to the nearest if, which is if (y > 5), no matter how it is indented. Because x > 5 is false, the whole inner if-else is skipped and only C is printed." },

/* ---------- Unit 3 ---------- */
{ id:23, topic:"3.5", stem:"Consider the following class and code segment.", code:`public class Account
{
    private double balance;

    public Account(double start) { balance = start; }

    public void deposit(double amt)
    {
        if (amt > 0)
        {
            balance += amt;
        }
    }

    public double getBalance() { return balance; }
}

Account x = new Account(50);
x.deposit(-20);
x.deposit(30);
System.out.println(x.getBalance());`, stemAfter:"What is printed as a result of executing the code segment?", opts:["80.0","60.0","100.0","80"], ans:"A",
  run:{pre:"static class Account { private double balance; public Account(double start){ balance = start; } public void deposit(double amt){ if (amt > 0) balance += amt; } public double getBalance(){ return balance; } }", main:"Account x = new Account(50); x.deposit(-20); x.deposit(30); System.out.println(x.getBalance());"},
  expl:"The deposit of -20 is ignored because it is not positive. 50 + 30 = 80, and a double prints as 80.0." },
{ id:24, topic:"3.3", stem:"Using the <code>Account</code> class from the previous question, which of the following statements in a different class will cause a compile-time error?", opts:["Account y = new Account(10.0);","y.deposit(5.0);","double b = y.getBalance();","y.balance = 100.0;"], ans:"D",
  expl:"balance is private, so it can only be used inside the Account class. Outside code must use the public methods." },
{ id:25, topic:"3.6", stem:"Consider the following method and code segment.", code:`public static void change(int[] arr, int v)
{
    arr[0] = v;
    v = 99;
}

int[] data = {1, 2, 3};
int n = 5;
change(data, n);
System.out.println(data[0] + " " + n);`, stemAfter:"What is printed as a result of executing the code segment?", opts:["5 5","5 99","1 5","99 99"], ans:"A",
  run:{pre:"static void change(int[] arr, int v){ arr[0] = v; v = 99; }", main:`int[] data = {1, 2, 3}; int n = 5; change(data, n); System.out.println(data[0] + " " + n);`},
  expl:"arr receives a copy of the reference, so arr[0] = v changes the caller's array. v is a copy of n, so setting v to 99 does not change n." },
{ id:26, topic:"3.7", stem:"Consider the following class and code segment.", code:`public class Visitor
{
    private static int total = 0;
    private int id;

    public Visitor()
    {
        total++;
        id = total;
    }

    public int getId() { return id; }
    public static int getTotal() { return total; }
}

Visitor a = new Visitor();
Visitor b = new Visitor();
Visitor c = new Visitor();
System.out.println(b.getId() + " " + Visitor.getTotal());`, stemAfter:"What is printed as a result of executing the code segment?", opts:["2 3","2 2","3 3","1 3"], ans:"A",
  run:{pre:"static class Visitor { private static int total = 0; private int id; public Visitor(){ total++; id = total; } public int getId(){ return id; } public static int getTotal(){ return total; } }", main:`Visitor a = new Visitor(); Visitor b = new Visitor(); Visitor c = new Visitor(); System.out.println(b.getId() + " " + Visitor.getTotal());`},
  expl:"total is shared by all Visitor objects. b was the second visitor, so its id is 2. After three objects, total is 3." },
{ id:27, topic:"3.9", stem:"Consider the following class.", code:`public class Pt
{
    private int x;
    private int y;

    public Pt(int x, int y)
    {
        x = x;
        this.y = y;
    }

    public String toString() { return x + " " + y; }
}`, stemAfter:"What is printed by <code>System.out.println(new Pt(4, 7));</code>?", opts:["0 7","4 7","4 0","0 0"], ans:"A",
  run:{pre:"static class Pt { private int x; private int y; public Pt(int x, int y){ x = x; this.y = y; } public String toString(){ return x + \" \" + y; } }", main:"System.out.println(new Pt(4, 7));"},
  expl:"In x = x, both names refer to the parameter, so the instance variable x keeps its default value 0. this.y = y correctly sets the instance variable y to 7." },
{ id:28, topic:"3.8", stem:"Consider the following class and code segment.", code:`public class Thermo
{
    private int temp = 70;

    public void set(int temp) { temp = temp + 5; }
    public void raise(int d)  { temp += d; }
    public int get()          { return temp; }
}

Thermo t = new Thermo();
t.set(60);
t.raise(3);
System.out.println(t.get());`, stemAfter:"What is printed as a result of executing the code segment?", opts:["73","68","65","78"], ans:"A",
  run:{pre:"static class Thermo { private int temp = 70; public void set(int temp){ temp = temp + 5; } public void raise(int d){ temp += d; } public int get(){ return temp; } }", main:"Thermo t = new Thermo(); t.set(60); t.raise(3); System.out.println(t.get());"},
  expl:"Inside set, the parameter temp shadows the instance variable, so only the parameter changes. The instance variable is still 70, and raise(3) makes it 73." },

/* ---------- Unit 4 ---------- */
{ id:29, topic:"4.3", stem:"What is printed as a result of executing the following code segment?", code:`int[] a = new int[4];
a[1] = 6;
a[a[0] + 2] = a[1] * 2;
System.out.println(a[0] + a[1] + a[2] + a[3]);`, opts:["18","12","6","An ArrayIndexOutOfBoundsException is thrown."], ans:"A", run:1,
  expl:"New int arrays are filled with 0. a[0] + 2 is 2, so a[2] gets 6 * 2 = 12. The sum is 0 + 6 + 12 + 0 = 18." },
{ id:30, topic:"4.4", stem:"What is printed as a result of executing the following code segment?", code:`double[] p = {1.5, 2.5};
for (double v : p)
{
    v *= 2;
}
System.out.println(p[0] + p[1]);`, opts:["4.0","8.0","3.05.0","4"], ans:"A", run:1,
  expl:"The enhanced for loop variable v is a copy of each element, so the array does not change. 1.5 + 2.5 = 4.0." },
{ id:31, topic:"4.5", stem:"What is printed as a result of executing the following code segment?", code:`int[] a = {1, 2, 3, 4, 5};
for (int i = a.length - 1; i > 0; i--)
{
    a[i] = a[i - 1];
}
for (int v : a)
{
    System.out.print(v + " ");
}`, opts:["1 1 2 3 4","1 1 1 1 1","2 3 4 5 5","5 1 2 3 4"], ans:"A", run:1,
  expl:"Working from the back, each element gets a copy of its left neighbor before that neighbor is changed, so everything shifts right by one. a[0] keeps its value 1." },
{ id:32, topic:"4.5", stem:"The following code segment is intended to count how many elements of the int array <code>a</code> are greater than the element just before them.", code:`int count = 0;
for (int i = 1; i < a.length; i++)
{
    if ( /* missing condition */ )
    {
        count++;
    }
}`, stemAfter:"Which of the following can replace <code>/* missing condition */</code> so the code works as intended?", opts:["a[i] > a[i - 1]","a[i] > a[i + 1]","a[i - 1] > a[i]","i > i - 1"], ans:"A",
  expl:"The element just before a[i] is a[i - 1]. Choice B goes out of bounds on the last pass, C counts decreases, and D is always true." },
{ id:33, topic:"4.8", stem:"What is printed as a result of executing the following code segment?", code:`ArrayList<String> list = new ArrayList<String>();
list.add("x");
list.add("y");
list.add(0, "z");
list.set(2, "w");
list.remove(1);
System.out.println(list);`, opts:["[z, w]","[x, w]","[z, x]","[z, y]"], ans:"A", run:1,
  expl:"After the adds the list is [x, y]. add(0, \"z\") gives [z, x, y]. set(2, \"w\") gives [z, x, w]. remove(1) removes x, leaving [z, w]." },
{ id:34, topic:"4.9", stem:"Consider the following code segment, where <code>nums</code> is an <code>ArrayList&lt;Integer&gt;</code> containing <code>[2, 4, 4, 5, 6]</code>.", code:`for (int i = 0; i < nums.size(); i++)
{
    if (nums.get(i) % 2 == 0)
    {
        nums.remove(i);
    }
}
System.out.println(nums);`, stemAfter:"What is printed as a result of executing the code segment?", opts:["[4, 5]","[5]","[4, 4, 5]","Nothing is printed because an IndexOutOfBoundsException is thrown."], ans:"A",
  run:{pre:"", main:"ArrayList<Integer> nums = new ArrayList<Integer>(); nums.add(2); nums.add(4); nums.add(4); nums.add(5); nums.add(6); for (int i = 0; i < nums.size(); i++) { if (nums.get(i) % 2 == 0) { nums.remove(i); } } System.out.println(nums);"},
  expl:"Removing at index 0 shifts the first 4 into index 0, but i moves on to 1, so it is skipped. The same happens again: the list goes [4, 4, 5, 6], then [4, 5, 6], then [4, 5]." },
{ id:35, topic:"4.7", stem:"Consider the following code segment.", code:`ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(7);
nums.add(3);
int s = nums.get(0) + nums.get(1);`, stemAfter:"Which of the following best explains why this code compiles and stores 10 in <code>s</code>?", opts:["The int values are autoboxed into Integer objects when added, and unboxed back to int values for the addition.","An ArrayList can store primitive int values directly.","The + operator joins the two Integer objects as Strings and then converts the result.","The get method always returns an int."], ans:"A",
  expl:"ArrayList holds objects, so 7 and 3 are autoboxed into Integer objects. When get returns an Integer in an arithmetic expression, Java unboxes it to an int." },
{ id:36, topic:"4.10", stem:"Consider the following code segment, where <code>words</code> is an <code>ArrayList&lt;String&gt;</code> containing <code>[\"sun\", \"moon\", \"star\", \"sky\"]</code>.", code:`String r = "";
for (String w : words)
{
    if (w.length() > 3)
    {
        r += w.substring(0, 1);
    }
}
System.out.println(r);`, stemAfter:"What is printed as a result of executing the code segment?", opts:["ms","ssms","moonstar","msss"], ans:"A",
  run:{pre:"", main:`ArrayList<String> words = new ArrayList<String>(); words.add("sun"); words.add("moon"); words.add("star"); words.add("sky"); String r = ""; for (String w : words) { if (w.length() > 3) { r += w.substring(0, 1); } } System.out.println(r);`},
  expl:"Only \"moon\" and \"star\" have more than 3 letters. Their first letters are m and s." },
{ id:37, topic:"4.11", stem:"What is printed as a result of executing the following code segment?", code:`int[][] m = { {1, 2, 3},
              {4, 5, 6} };
System.out.println(m[1][2] - m[0][1] + m.length);`, opts:["6","7","5","3"], ans:"A", run:1,
  expl:"m[1][2] is 6 (row 1, column 2) and m[0][1] is 2. m.length is the number of rows, 2. 6 - 2 + 2 = 6." },
{ id:38, topic:"4.12", stem:"What is printed as a result of executing the following code segment?", code:`int[][] m = { {1, 2, 3},
              {4, 5, 6} };
for (int c = 0; c < m[0].length; c++)
{
    for (int r = 0; r < m.length; r++)
    {
        System.out.print(m[r][c] + " ");
    }
}`, opts:["1 4 2 5 3 6","1 2 3 4 5 6","6 5 4 3 2 1","1 4 2 5"], ans:"A", run:1,
  expl:"The outer loop goes through columns, so this is column-major order: down column 0 (1, 4), then column 1 (2, 5), then column 2 (3, 6)." },
{ id:39, topic:"4.13", stem:"Consider the following method.", code:`public static int bigRows(int[][] g, int limit)
{
    int count = 0;
    for (int[] row : g)
    {
        int sum = 0;
        for (int v : row)
        {
            sum += v;
        }
        if (sum > limit)
        {
            count++;
        }
    }
    return count;
}`, stemAfter:"What value is returned by <code>bigRows(new int[][] { {3, 4, 5}, {1, 1, 1}, {9, 2, 0} }, 10)</code>?", opts:["2","1","3","0"], ans:"A",
  run:{pre:"static int bigRows(int[][] g, int limit){ int count = 0; for (int[] row : g){ int sum = 0; for (int v : row) sum += v; if (sum > limit) count++; } return count; }", main:"System.out.println(bigRows(new int[][] { {3, 4, 5}, {1, 1, 1}, {9, 2, 0} }, 10));"},
  expl:"The row sums are 12, 3, and 11. Two of them are greater than 10." },
{ id:40, topic:"4.14", stem:"A binary search for 30 is run on the sorted array below, using <code>mid = (low + high) / 2</code>.", code:`int[] a = {3, 8, 12, 17, 21, 30, 41, 55};`, stemAfter:"Which elements are compared with 30, in order, before the search ends?", opts:["17, 30","21, 30","17, 41, 30","3, 8, 12, 17, 21, 30"], ans:"A",
  expl:"low = 0 and high = 7, so mid = 3 and a[3] = 17, which is too small. Then low = 4, mid = (4 + 7) / 2 = 5, and a[5] = 30 is found." },
{ id:41, topic:"4.15", stem:"Selection sort is used to sort the array <code>{6, 2, 9, 1, 5}</code> from least to greatest. What does the array look like after the first two passes of the outer loop?", opts:["{1, 2, 9, 6, 5}","{2, 6, 9, 1, 5}","{1, 2, 6, 9, 5}","{1, 2, 5, 6, 9}"], ans:"A",
  expl:"Pass 1 swaps the smallest value, 1, with 6: {1, 2, 9, 6, 5}. Pass 2 finds the smallest of the rest, 2, which is already at index 1, so nothing moves. Choice B is what insertion sort gives after two passes." },
{ id:42, topic:"4.16", stem:"Consider the following method.", code:`public static int r(int n)
{
    if (n < 10)
    {
        return n;
    }
    return r(n / 10) + n % 10;
}`, stemAfter:"What value is returned by the call <code>r(4729)</code>?", opts:["22","4729","9274","4"], ans:"A",
  run:{pre:"static int r(int n){ if (n < 10) return n; return r(n / 10) + n % 10; }", main:"System.out.println(r(4729));"},
  expl:"Each call adds the last digit and recurses on the rest: r(4729) = r(472) + 9 = r(47) + 2 + 9 = r(4) + 7 + 2 + 9 = 4 + 7 + 2 + 9 = 22. It adds the digits." }
],

/* ---------- Section II: free response ---------- */
frq: [
{ q:"Question 1", label:"Methods and Control Structures",
  intro:"<p>A reaction-time game gives players points based on how many seconds a round takes, and records each round as <code>\"W\"</code> (win) or <code>\"L\"</code> (loss). You will write two static methods of the <code>GameStats</code> class.</p>",
  code:`public class GameStats
{
    /** Returns the points earned for a round that took the given
     *  number of seconds, as described in part (a).
     *  Precondition: seconds >= 0
     */
    public static int pointsFor(int seconds)
    { /* to be implemented in part (a) */ }

    /** Returns the length of the longest run of consecutive "W"
     *  characters in results, as described in part (b).
     *  Precondition: results contains only "W" and "L" characters.
     */
    public static int longestWinStreak(String results)
    { /* to be implemented in part (b) */ }
}`,
  parts:[
    { label:"(a)", prompt:"Write <code>pointsFor</code>. A round that takes 10 seconds or less earns 100 points. A round that takes more than 10 seconds but no more than 30 seconds earns 100 minus 3 points for each second over 10. A round that takes more than 30 seconds earns 20 points. For example, <code>pointsFor(8)</code> returns 100, <code>pointsFor(14)</code> returns 88, and <code>pointsFor(45)</code> returns 20.",
      pts:["Correctly identifies the 10-second-or-less case and returns 100","Correctly computes 100 - 3 * (seconds - 10) for 11 to 30 seconds","Returns 20 for more than 30 seconds, and every case returns a value"],
      sample:`public static int pointsFor(int seconds)
{
    if (seconds <= 10)
    {
        return 100;
    }
    else if (seconds <= 30)
    {
        return 100 - 3 * (seconds - 10);
    }
    return 20;
}` },
    { label:"(b)", prompt:"Write <code>longestWinStreak</code>. For example, <code>longestWinStreak(\"WWLWWWL\")</code> returns 3, <code>longestWinStreak(\"LLL\")</code> returns 0, and <code>longestWinStreak(\"\")</code> returns 0.",
      pts:["Accesses every character of results without going out of bounds (for example with substring(i, i + 1))","Compares each character with \"W\" using equals","Counts the current streak and resets it to 0 at an \"L\"","Keeps the longest streak and returns it, including a streak that ends at the last character"],
      sample:`public static int longestWinStreak(String results)
{
    int best = 0;
    int current = 0;
    for (int i = 0; i < results.length(); i++)
    {
        if (results.substring(i, i + 1).equals("W"))
        {
            current++;
            if (current > best)
            {
                best = current;
            }
        }
        else
        {
            current = 0;
        }
    }
    return best;
}` }
  ] },
{ q:"Question 2", label:"Class Design",
  intro:"<p>Write the complete <code>WaterBottle</code> class. A <code>WaterBottle</code> has a capacity in milliliters and starts empty. It has the following behaviors.</p><ul><li>The constructor takes the capacity as an int parameter.</li><li><code>fill(int ml)</code> adds water, but never more than the bottle can hold, and returns the amount that was actually added.</li><li><code>drink(int ml)</code> removes <code>ml</code> milliliters and returns <code>true</code> if the bottle has at least that much water. Otherwise it removes nothing and returns <code>false</code>.</li><li><code>getAmount()</code> returns the amount of water now in the bottle.</li></ul><p>The table shows an example.</p><div class=\"tablewrap\"><table><tr><th>Statement</th><th>Value returned</th><th>Amount after</th></tr><tr><td><code>WaterBottle b = new WaterBottle(500);</code></td><td></td><td>0</td></tr><tr><td><code>b.fill(300)</code></td><td>300</td><td>300</td></tr><tr><td><code>b.fill(400)</code></td><td>200</td><td>500</td></tr><tr><td><code>b.drink(150)</code></td><td>true</td><td>350</td></tr><tr><td><code>b.drink(400)</code></td><td>false</td><td>350</td></tr><tr><td><code>b.getAmount()</code></td><td>350</td><td>350</td></tr></table></div>",
  code:"",
  parts:[
    { label:"", prompt:"Write the complete <code>WaterBottle</code> class, including the instance variables, the constructor, and the three methods.",
      pts:["Declares private instance variables for the capacity and the current amount","Constructor sets the capacity from its parameter and starts the amount at 0","fill adds no more than the space left (capacity - amount)","fill returns the amount actually added","drink checks whether there is enough water before removing it","drink removes the water and returns true, or changes nothing and returns false","getAmount returns the current amount; all method headers are public with correct return types"],
      sample:`public class WaterBottle
{
    private int capacity;
    private int amount;

    public WaterBottle(int cap)
    {
        capacity = cap;
        amount = 0;
    }

    public int fill(int ml)
    {
        int added = Math.min(ml, capacity - amount);
        amount += added;
        return added;
    }

    public boolean drink(int ml)
    {
        if (ml <= amount)
        {
            amount -= ml;
            return true;
        }
        return false;
    }

    public int getAmount()
    {
        return amount;
    }
}` }
  ] },
{ q:"Question 3", label:"Data Analysis with ArrayList",
  intro:"<p>A music app stores songs in a <code>Playlist</code>. The <code>Song</code> class is shown below. You will write one method of the <code>Playlist</code> class.</p>",
  code:`public class Song
{
    /** Returns the title of this song */
    public String getTitle() { /* implementation not shown */ }

    /** Returns the length of this song in seconds */
    public int getSeconds() { /* implementation not shown */ }

    // There may be instance variables, constructors, and methods that are not shown.
}

public class Playlist
{
    /** The songs in this playlist. Guaranteed not to be null. */
    private ArrayList<Song> songs;

    /** Removes every song shorter than minSeconds and returns
     *  the number of songs removed, as described below. */
    public int removeShort(int minSeconds)
    { /* to be implemented */ }

    // There may be instance variables, constructors, and methods that are not shown.
}`,
  parts:[
    { label:"", prompt:"Write <code>removeShort</code>. For example, if the songs have lengths 200, 90, 45, and 310 seconds, <code>removeShort(100)</code> removes the songs with lengths 90 and 45, leaves the other two in their original order, and returns 2.",
      pts:["Accesses every song in songs (no out-of-bounds index)","Calls getSeconds() on a Song and compares it with minSeconds","Removes a song from songs when it is too short","Removes every short song without skipping any (for example by looping backward, or by not increasing the index after a removal)","Counts and returns the number of songs removed"],
      sample:`public int removeShort(int minSeconds)
{
    int removed = 0;
    for (int i = songs.size() - 1; i >= 0; i--)
    {
        if (songs.get(i).getSeconds() < minSeconds)
        {
            songs.remove(i);
            removed++;
        }
    }
    return removed;
}` }
  ] },
{ q:"Question 4", label:"2D Array",
  intro:"<p>A classroom seating chart is stored in a 2D array. Each element holds a student ID number, or 0 if the seat is empty. You will write one method of the <code>SeatingChart</code> class.</p>",
  code:`public class SeatingChart
{
    /** seats[r][c] is the ID of the student in row r, column c,
     *  or 0 if that seat is empty. seats is rectangular with at
     *  least one row and one column. */
    private int[][] seats;

    /** Returns the index of the first row, starting from row 0,
     *  that has two empty seats next to each other in the same row.
     *  Returns -1 if there is no such row. */
    public int firstRowWithPair()
    { /* to be implemented */ }

    // There may be instance variables, constructors, and methods that are not shown.
}`,
  parts:[
    { label:"", prompt:"Write <code>firstRowWithPair</code>. For example, if <code>seats</code> is <code>{ {4, 0, 7, 0}, {0, 0, 5, 9}, {0, 0, 0, 2} }</code>, the method returns 1. Row 0 has two empty seats, but they are not next to each other.",
      pts:["Traverses the rows of seats in order, starting at row 0","Traverses the columns of each row","Compares horizontally adjacent elements such as seats[r][c] and seats[r][c + 1] without going out of bounds","Checks that both seats in a pair are 0","Returns the row index of the first row with a pair, as soon as it is found","Returns -1 only after checking every row"],
      sample:`public int firstRowWithPair()
{
    for (int r = 0; r < seats.length; r++)
    {
        for (int c = 0; c < seats[r].length - 1; c++)
        {
            if (seats[r][c] == 0 && seats[r][c + 1] == 0)
            {
                return r;
            }
        }
    }
    return -1;
}` }
  ] }
]
};
