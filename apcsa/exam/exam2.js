/* AP CSA Practice Exam 2 (cyberteaches.com/apcsa/exam/2/)
   Every question, program and scenario here is original CyberTeaches material.
   Fields are described at the top of exam1.js. */
window.CSA_EXAM = {
id: "exam-2", num: 2,
name: "AP CSA Practice Exam 2",
questions: [
/* ---------- Unit 1 ---------- */
{ id:1, topic:"1.4", stem:"What is printed as a result of executing the following code segment?", code:`int a = 8;
int b = 3;
a = a + b;
b = a - b;
a = a - b;
System.out.println(a + " " + b);`, opts:["3 8","8 3","11 8","3 3"], ans:"A", run:1,
  expl:"a becomes 11, then b becomes 11 - 3 = 8, then a becomes 11 - 8 = 3. The code swaps the two values without a temporary variable." },
{ id:2, topic:"1.3", stem:"What is printed as a result of executing the following statement?", code:`System.out.println(7 + 3 + "4" + 7 + 3);`, opts:["10473","10410","73473","24"], ans:"A", run:1,
  expl:"Java works from left to right. 7 + 3 is 10. Then 10 + \"4\" is the String \"104\", and each + after that joins text: \"1047\", then \"10473\"." },
{ id:3, topic:"1.5", stem:"What is printed as a result of executing the following code segment?", code:`double avg = 17 / 5;
System.out.println(avg);`, opts:["3.0","3.4","3","4.0"], ans:"A", run:1,
  expl:"17 / 5 is integer division, which gives 3, before the value is stored. Storing 3 in a double gives 3.0." },
{ id:4, topic:"1.8", stem:"Consider the following method.", code:`/** Returns the average of the first n values in nums.
 *  Precondition: 0 < n <= nums.length
 */
public static double avgFirst(int[] nums, int n)`, stemAfter:"Which of the following best describes what happens if <code>avgFirst</code> is called with <code>n</code> equal to 0?", opts:["The method is not guaranteed to work correctly, because the precondition is not met.","The method automatically changes n to 1.","The method must return 0.0.","The code will not compile."], ans:"A",
  expl:"A precondition is what must be true before the method is called. If it is not met, the method makes no promise about its behavior. The call still compiles." },
{ id:5, topic:"1.15", stem:"What is printed as a result of executing the following code segment?", code:`String s = "Mississippi";
String t = s.substring(s.indexOf("ss"), s.indexOf("pp"));
System.out.println(t);`, opts:["ssissi","ssiss","ississ","ssissip"], ans:"A", run:1,
  expl:"\"ss\" first appears at index 2 and \"pp\" at index 8. substring(2, 8) gives the characters at indexes 2 through 7: s, s, i, s, s, i." },
{ id:6, topic:"1.15", stem:"What is printed as a result of executing the following code segment?", code:`String x = "hi";
String y = x;
String z = new String("hi");
System.out.println((x == y) + " " + (x == z) + " " + x.equals(z));`, opts:["true false true","true true true","false false true","true false false"], ans:"A", run:1,
  expl:"y refers to the same object as x, so x == y is true. z is a new String object, so x == z is false, even though x.equals(z) is true because the characters match." },
{ id:7, topic:"1.11", stem:"What is printed as a result of executing the following statement?", code:`System.out.println(Math.abs(3 - 8) + Math.sqrt(49) * 2);`, opts:["19.0","19","24.0","-5.0"], ans:"A", run:1,
  expl:"Math.abs(-5) is 5 and Math.sqrt(49) is 7.0. Multiplication comes first: 7.0 * 2 = 14.0, and 5 + 14.0 = 19.0, a double." },
{ id:8, topic:"1.13", stem:"The <code>Dog</code> class has exactly one constructor, with the header <code>public Dog(String name, int age)</code>. Which of the following statements correctly creates a <code>Dog</code> object?", opts:["Dog d = new Dog(\"Rex\", 4);","Dog d = new Dog(4, \"Rex\");","Dog d = Dog(\"Rex\", 4);","Dog d = new Dog();"], ans:"A",
  expl:"An object is created with new and a constructor call whose arguments match the parameters in number, order, and type. There is no constructor with no parameters." },
{ id:9, topic:"1.10", stem:"Consider the following method.", code:`public static int sq(int x)
{
    return x * x;
}`, stemAfter:"What is printed by <code>System.out.println(sq(sq(2) + 1));</code>?", opts:["25","17","10","16"], ans:"A",
  run:{pre:"static int sq(int x){ return x * x; }", main:"System.out.println(sq(sq(2) + 1));"},
  expl:"The inner call sq(2) returns 4, so the outer call is sq(5), which returns 25." },

/* ---------- Unit 2 ---------- */
{ id:10, topic:"2.2", stem:"What is printed as a result of executing the following code segment?", code:`int x = 7;
boolean b = x % 3 == 1;
System.out.println(b);`, opts:["true","false","1","The code does not compile."], ans:"A", run:1,
  expl:"% runs before ==. 7 % 3 is 1, and 1 == 1 is true." },
{ id:11, topic:"2.3", stem:"What is printed as a result of executing the following code segment?", code:`int score = 75;
String g = "F";
if (score >= 70)
{
    g = "C";
}
if (score >= 80)
{
    g = "B";
}
if (score >= 90)
{
    g = "A";
}
System.out.println(g);`, opts:["C","F","A","CBA"], ans:"A", run:1,
  expl:"These are three separate if statements. Only the first condition is true for 75, so g is set to \"C\" and keeps that value." },
{ id:12, topic:"2.4", stem:"What is printed as a result of executing the following code segment?", code:`int n = 10;
if (n % 3 == 0 && n % 5 == 0)
{
    System.out.println("FB");
}
else if (n % 3 == 0)
{
    System.out.println("F");
}
else if (n % 5 == 0)
{
    System.out.println("B");
}
else
{
    System.out.println(n);
}`, opts:["B","FB","10","F"], ans:"A", run:1,
  expl:"10 is not divisible by 3, so the first two conditions are false. 10 % 5 == 0 is true, so B is printed and the rest is skipped." },
{ id:13, topic:"2.6", stem:"For boolean variables <code>a</code> and <code>b</code>, which of the following is equivalent to <code>(a &amp;&amp; b) || (a &amp;&amp; !b)</code>?", opts:["a","b","a && b","true"], ans:"A",
  expl:"If a is true, one of the two parts is true no matter what b is. If a is false, both parts are false. So the expression always has the same value as a." },
{ id:14, topic:"2.6", stem:"Which of the following is equivalent to <code>!(a &gt; 0 &amp;&amp; b &gt; 0)</code> for all int values of <code>a</code> and <code>b</code>?", opts:["a <= 0 || b <= 0","a <= 0 && b <= 0","a < 0 || b < 0","!a > 0 || !b > 0"], ans:"A",
  expl:"By De Morgan's law, !(p && q) is !p || !q. The opposite of a > 0 is a <= 0. Choice D does not compile, because ! cannot be applied to an int." },
{ id:15, topic:"2.7", stem:"What is printed as a result of executing the following code segment?", code:`int sum = 0;
int k = 1;
while (sum < 20)
{
    sum += k;
    k += 2;
}
System.out.println(k);`, opts:["11","9","25","13"], ans:"A", run:1,
  expl:"sum takes the values 1, 4, 9, 16, 25 while k takes 3, 5, 7, 9, 11. When sum is 25 the loop stops, and k is 11." },
{ id:16, topic:"2.8", stem:"What is printed as a result of executing the following code segment?", code:`int s = 0;
for (int i = 1; i <= 10; i++)
{
    s += i % 3;
}
System.out.println(s);`, opts:["10","55","9","18"], ans:"A", run:1,
  expl:"The remainders for 1 through 10 are 1, 2, 0, 1, 2, 0, 1, 2, 0, 1. Their sum is 10." },
{ id:17, topic:"2.9", stem:"What is printed as a result of executing the following code segment?", code:`int n = 58219;
int c = 0;
while (n > 0)
{
    if (n % 10 > 4)
    {
        c++;
    }
    n /= 10;
}
System.out.println(c);`, opts:["3","2","4","5"], ans:"A", run:1,
  expl:"The loop looks at the digits from right to left: 9, 1, 2, 8, 5. Three of them (9, 8, 5) are greater than 4." },
{ id:18, topic:"2.10", stem:"What is printed as a result of executing the following code segment?", code:`String s = "banana";
int c = 0;
for (int i = 0; i < s.length() - 1; i++)
{
    if (s.substring(i, i + 2).equals("an"))
    {
        c++;
    }
}
System.out.println(c);`, opts:["2","3","1","Nothing is printed because a StringIndexOutOfBoundsException is thrown."], ans:"A", run:1,
  expl:"\"an\" starts at indexes 1 and 3. The loop stops at length() - 2, so substring(i, i + 2) never goes past the end." },
{ id:19, topic:"2.11", stem:"What is printed as a result of executing the following code segment?", code:`for (int r = 1; r <= 3; r++)
{
    for (int c = r; c <= 3; c++)
    {
        System.out.print(c);
    }
    System.out.print(" ");
}`, opts:["123 23 3","123 123 123","1 12 123","3 23 123"], ans:"A", run:1,
  expl:"The inner loop starts at r each time, so it prints 123, then 23, then 3, with a space after each row." },
{ id:20, topic:"2.12", stem:"Consider the following code segment, where <code>n</code> is 100.", code:`for (int i = n; i > 0; i /= 2)
{
    System.out.println(i);
}`, stemAfter:"How many times is the <code>println</code> statement executed?", opts:["7","50","6","100"], ans:"A",
  run:{pre:"", main:"int n = 100; int c = 0; for (int i = n; i > 0; i /= 2) c++; System.out.println(c);"},
  expl:"i takes the values 100, 50, 25, 12, 6, 3, and 1. Then 1 / 2 is 0 and the loop stops: 7 times." },
{ id:21, topic:"2.1", stem:"Which of the following tasks requires an algorithm that uses both selection and iteration?", opts:["Counting how many numbers in a list are negative","Adding two numbers that the user types","Printing the same greeting once","Swapping the values of two variables"], ans:"A",
  expl:"Counting negatives means repeating a step for every number (iteration) and deciding whether each one is negative (selection). The other tasks need neither a loop nor a decision." },
{ id:22, topic:"2.7", stem:"Which of the following code segments results in an infinite loop?", opts:["int i = 0; while (i < 10) { i++; }","int i = 10; while (i > 0) { i--; }","int i = 0; while (i < 10) { i--; }","int i = 1; while (i < 10) { i *= 2; }"], ans:"C",
  expl:"In choice C, i starts at 0 and gets smaller, so i < 10 is always true. In the other choices, i moves toward making the condition false." },

/* ---------- Unit 3 ---------- */
{ id:23, topic:"3.5", stem:"Consider the following class and code segment.", code:`public class Score
{
    private int pts;
    private int bonus;

    public Score(int p)
    {
        pts = p;
        bonus = 0;
    }

    public void addBonus(int b)
    {
        if (b <= 10)
        {
            bonus += b;
        }
    }

    public int total() { return pts + bonus; }
}

Score s = new Score(80);
s.addBonus(5);
s.addBonus(12);
s.addBonus(10);
System.out.println(s.total());`, stemAfter:"What is printed as a result of executing the code segment?", opts:["95","107","85","80"], ans:"A",
  run:{pre:"static class Score { private int pts; private int bonus; public Score(int p){ pts = p; bonus = 0; } public void addBonus(int b){ if (b <= 10) bonus += b; } public int total(){ return pts + bonus; } }", main:"Score s = new Score(80); s.addBonus(5); s.addBonus(12); s.addBonus(10); System.out.println(s.total());"},
  expl:"The bonus of 12 is ignored because it is more than 10. 80 + 5 + 10 = 95." },
{ id:24, topic:"3.5", stem:"A method of a <code>Student</code> class should take a test score as a parameter and report whether the score is a passing score. Which of the following is the most appropriate method header?", opts:["public boolean passed(int score)","public void passed(int score)","public int passed(boolean score)","public passed(int score)"], ans:"A",
  expl:"The answer is yes or no, so the return type is boolean, and the score is an int parameter. A void method cannot report a value, and every method except a constructor needs a return type." },
{ id:25, topic:"3.1", stem:"A <code>Rectangle</code> class needs to report its width, height, and area. Which set of instance variables is the best design?", opts:["private double width; private double height;","private double width; private double height; private double area;","public double width; public double height;","private double area;"], ans:"A",
  expl:"The area can always be computed from the width and height in a method, so storing it would only create a value that could get out of date. Instance variables should be private." },
{ id:26, topic:"3.2", stem:"A student wants to use an open source code library in an app. The library's license allows anyone to use the code as long as the original authors are credited. Which action follows the license?", opts:["Use the library and include the credit that the license requires","Use the library and remove the authors' names from the code","Copy the code and publish it under the student's own name","Use the library only if the app is never shared"], ans:"A",
  expl:"A license states how code may be used. Following it, here by giving credit, is both legal and ethical." },
{ id:27, topic:"3.6", stem:"Consider the following class and code segment.", code:`public class Team
{
    private int[] scores = {4, 7};

    public int[] getScores() { return scores; }
    public int sum() { return scores[0] + scores[1]; }
}

Team t = new Team();
int[] s = t.getScores();
s[0] = 10;
System.out.println(t.sum());`, stemAfter:"What is printed as a result of executing the code segment?", opts:["17","11","14","10"], ans:"A",
  run:{pre:"static class Team { private int[] scores = {4, 7}; public int[] getScores(){ return scores; } public int sum(){ return scores[0] + scores[1]; } }", main:"Team t = new Team(); int[] s = t.getScores(); s[0] = 10; System.out.println(t.sum());"},
  expl:"getScores returns a reference to the Team's own array, not a copy. Changing s[0] changes the Team's data, so sum returns 10 + 7 = 17." },
{ id:28, topic:"3.7", stem:"Consider the following class.", code:`public class Clicker
{
    private int count;                                // line 1
    private static int made = 0;                      // line 2
    public Clicker() { made++; }                      // line 3
    public static int getCount() { return count; }    // line 4
}`, stemAfter:"Which line causes a compile-time error?", opts:["Line 1","Line 2","Line 3","Line 4"], ans:"D",
  expl:"getCount is static, so it is not called on any particular object and cannot use the instance variable count. A constructor can use a static variable, so line 3 is fine." },

/* ---------- Unit 4 ---------- */
{ id:29, topic:"4.1", stem:"A study app asks for permission to collect each student's location all day, but it only needs to know which school a student attends. Which change best protects students' privacy?", opts:["Ask only for the school name, and let students choose whether to share any more","Collect the location data but do not tell students","Collect the location data and sell it to pay for the app","Keep collecting the location data, because more data is always better"], ans:"A",
  expl:"Collecting only the data that is needed, with the user's informed consent, protects privacy." },
{ id:30, topic:"4.2", stem:"What is printed as a result of executing the following code segment?", code:`int[] temps = {70, 80, 75, 90, 85};
int sum = 0;
for (int t : temps)
{
    sum += t;
}
int avg = sum / temps.length;
int count = 0;
for (int t : temps)
{
    if (t > avg)
    {
        count++;
    }
}
System.out.println(count);`, opts:["2","3","1","5"], ans:"A", run:1,
  expl:"The sum is 400 and the average is 80. Only 90 and 85 are greater than 80." },
{ id:31, topic:"4.15", stem:"Insertion sort is used to sort the array <code>{7, 4, 9, 2}</code> from least to greatest. What does the array look like after the first two passes of the outer loop?", opts:["{4, 7, 9, 2}","{2, 4, 9, 7}","{4, 7, 2, 9}","{2, 4, 7, 9}"], ans:"A",
  expl:"Pass 1 inserts 4 before 7: {4, 7, 9, 2}. Pass 2 inserts 9, which is already in place. The 2 has not been looked at yet. Choice B is what selection sort gives after two passes." },
{ id:32, topic:"4.4", stem:"What is printed as a result of executing the following code segment?", code:`int[] a = {3, 1, 4, 1, 5, 9, 2, 6};
int s = 0;
for (int i = 1; i < a.length; i += 2)
{
    s += a[i];
}
System.out.println(s);`, opts:["17","14","31","9"], ans:"A", run:1,
  expl:"The loop visits the odd indexes 1, 3, 5, and 7, which hold 1, 1, 9, and 6. Their sum is 17." },
{ id:33, topic:"4.5", stem:"The following code segment is intended to reverse the array <code>a</code>.", code:`int[] a = {1, 2, 3, 4, 5};
for (int i = 0; i < a.length; i++)
{
    int temp = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = temp;
}
for (int v : a)
{
    System.out.print(v + " ");
}`, stemAfter:"What is printed as a result of executing the code segment?", opts:["1 2 3 4 5","5 4 3 2 1","5 4 3 4 5","1 2 3 2 1"], ans:"A", run:1,
  expl:"The loop goes all the way to the end, so every pair is swapped twice: once in the first half and back again in the second half. The loop should stop at a.length / 2." },
{ id:34, topic:"4.6", stem:"A line read from a text file is stored in <code>line</code>. What is printed as a result of executing the following code segment?", code:`String line = "7,3,9";
String[] parts = line.split(",");
int s = 0;
for (String p : parts)
{
    s += Integer.parseInt(p);
}
System.out.println(s);`, opts:["19","739","3","7,3,9"], ans:"A", run:1,
  expl:"split gives the array {\"7\", \"3\", \"9\"}. parseInt turns each piece into an int, and 7 + 3 + 9 = 19." },
{ id:35, topic:"4.7", stem:"What is printed as a result of executing the following code segment?", code:`ArrayList<Double> d = new ArrayList<Double>();
d.add(2.5);
d.add(1.5);
double s = d.get(0) * d.get(1);
System.out.println(s);`, opts:["3.75","4.0","2.51.5","The code does not compile."], ans:"A", run:1,
  expl:"The doubles are autoboxed into Double objects when added and unboxed when multiplied. 2.5 * 1.5 = 3.75." },
{ id:36, topic:"4.8", stem:"What is printed as a result of executing the following code segment?", code:`ArrayList<Integer> list = new ArrayList<Integer>();
list.add(10);
list.add(20);
list.add(30);
list.add(1, list.remove(2));
System.out.println(list);`, opts:["[10, 30, 20]","[10, 20, 30]","[30, 10, 20]","[10, 30, 20, 30]"], ans:"A", run:1,
  expl:"remove(2) removes and returns 30, leaving [10, 20]. Then add(1, 30) inserts 30 at index 1, giving [10, 30, 20]." },
{ id:37, topic:"4.9", stem:"Consider the following code segment, where <code>names</code> is an <code>ArrayList&lt;String&gt;</code> containing <code>[\"Ana\", \"Ben\", \"Cal\", \"Dee\"]</code>.", code:`for (int i = 0; i < names.size(); i += 2)
{
    names.set(i, names.get(i).substring(0, 1));
}
System.out.println(names);`, stemAfter:"What is printed as a result of executing the code segment?", opts:["[A, Ben, C, Dee]","[A, B, C, D]","[Ana, B, Cal, D]","[A, C]"], ans:"A",
  run:{pre:"", main:`ArrayList<String> names = new ArrayList<String>(); names.add("Ana"); names.add("Ben"); names.add("Cal"); names.add("Dee"); for (int i = 0; i < names.size(); i += 2) { names.set(i, names.get(i).substring(0, 1)); } System.out.println(names);`},
  expl:"Only indexes 0 and 2 are visited, and set replaces those elements with their first letter. The size does not change." },
{ id:38, topic:"4.10", stem:"Consider the following code segment, where <code>a</code> is an <code>ArrayList&lt;Integer&gt;</code> containing <code>[3, 3, 5, 5, 5, 8]</code>.", code:`for (int i = a.size() - 1; i > 0; i--)
{
    if (a.get(i).equals(a.get(i - 1)))
    {
        a.remove(i);
    }
}
System.out.println(a);`, stemAfter:"What is printed as a result of executing the code segment?", opts:["[3, 5, 8]","[3, 5, 5, 8]","[8]","[3, 3, 5, 8]"], ans:"A",
  run:{pre:"", main:"ArrayList<Integer> a = new ArrayList<Integer>(); a.add(3); a.add(3); a.add(5); a.add(5); a.add(5); a.add(8); for (int i = a.size() - 1; i > 0; i--) { if (a.get(i).equals(a.get(i - 1))) { a.remove(i); } } System.out.println(a);"},
  expl:"Going backward, each element that equals the one before it is removed. Removing at i never moves an element the loop still needs to check, so every repeat is removed." },
{ id:39, topic:"4.11", stem:"What is printed as a result of executing the following code segment?", code:`int[][] g = new int[3][4];
for (int r = 0; r < g.length; r++)
{
    for (int c = 0; c < g[0].length; c++)
    {
        g[r][c] = r * c;
    }
}
System.out.println(g[2][3] + g[1][2]);`, opts:["8","5","12","An ArrayIndexOutOfBoundsException is thrown."], ans:"A", run:1,
  expl:"Each element holds row times column. g[2][3] is 6 and g[1][2] is 2, so 8 is printed. Row 2 and column 3 are the last valid indexes." },
{ id:40, topic:"4.16", stem:"Consider the following method.", code:`public static String f(String s)
{
    if (s.length() <= 1)
    {
        return s;
    }
    return f(s.substring(1)) + s.substring(0, 1);
}`, stemAfter:"What value is returned by the call <code>f(\"abc\")</code>?", opts:["cba","abc","bca","c"], ans:"A",
  run:{pre:"static String f(String s){ if (s.length() <= 1) return s; return f(s.substring(1)) + s.substring(0, 1); }", main:`System.out.println(f("abc"));`},
  expl:"f(\"abc\") = f(\"bc\") + \"a\" = (f(\"c\") + \"b\") + \"a\" = \"c\" + \"b\" + \"a\". The method reverses the String." },
{ id:41, topic:"4.13", stem:"What is printed as a result of executing the following code segment?", code:`int[][] m = { {4, 9, 2},
              {3, 5, 7},
              {8, 1, 6} };
int count = 0;
for (int r = 0; r < m.length; r++)
{
    for (int c = 1; c < m[r].length; c++)
    {
        if (m[r][c] > m[r][c - 1])
        {
            count++;
        }
    }
}
System.out.println(count);`, opts:["4","3","5","6"], ans:"A", run:1,
  expl:"The code counts elements that are greater than their left neighbor: 9 > 4 in row 0, 5 > 3 and 7 > 5 in row 1, and 6 > 1 in row 2." },
{ id:42, topic:"4.17", stem:"Merge sort is used to sort <code>{8, 3, 5, 1}</code> from least to greatest. Just before the final merge, which two sorted halves are merged?", opts:["{3, 8} and {1, 5}","{1, 3} and {5, 8}","{8, 3} and {5, 1}","{3, 5} and {1, 8}"], ans:"A",
  expl:"Merge sort splits the array into {8, 3} and {5, 1}, sorts each half recursively into {3, 8} and {1, 5}, and then merges them into {1, 3, 5, 8}." }
],

/* ---------- Section II: free response ---------- */
frq: [
{ q:"Question 1", label:"Methods and Control Structures",
  intro:"<p>A sign-up website checks passwords and hides most of each stored card number. You will write two static methods of the <code>AccountTools</code> class.</p>",
  code:`public class AccountTools
{
    /** Returns true if pw is a strong password, as described in part (a). */
    public static boolean isStrong(String pw)
    { /* to be implemented in part (a) */ }

    /** Returns a masked copy of card, as described in part (b).
     *  Precondition: card.length() >= 4
     */
    public static String mask(String card)
    { /* to be implemented in part (b) */ }
}`,
  parts:[
    { label:"(a)", prompt:"Write <code>isStrong</code>. A password is strong if it has at least 8 characters and contains at least one digit (0 through 9). For example, <code>isStrong(\"tiger2024\")</code> returns true, <code>isStrong(\"tigerlily\")</code> returns false (no digit), and <code>isStrong(\"ab3\")</code> returns false (too short). Hint: <code>\"0123456789\".indexOf(ch)</code> is at least 0 when the one-character String <code>ch</code> is a digit.",
      pts:["Checks that pw has at least 8 characters","Looks at every character of pw and correctly identifies a digit","Returns true only when both conditions hold, and false otherwise"],
      sample:`public static boolean isStrong(String pw)
{
    if (pw.length() < 8)
    {
        return false;
    }
    for (int i = 0; i < pw.length(); i++)
    {
        if ("0123456789".indexOf(pw.substring(i, i + 1)) >= 0)
        {
            return true;
        }
    }
    return false;
}` },
    { label:"(b)", prompt:"Write <code>mask</code>, which returns a String the same length as <code>card</code> in which every character except the last 4 is replaced by <code>\"*\"</code>. The last 4 characters stay the same. For example, <code>mask(\"4111222233334444\")</code> returns <code>\"************4444\"</code> and <code>mask(\"1234\")</code> returns <code>\"1234\"</code>.",
      pts:["Builds a new String (Strings cannot be changed)","Adds exactly card.length() - 4 asterisks","Keeps the last 4 characters, for example with card.substring(card.length() - 4)","Returns the result, and the result has the same length as card"],
      sample:`public static String mask(String card)
{
    String result = "";
    for (int i = 0; i < card.length() - 4; i++)
    {
        result += "*";
    }
    return result + card.substring(card.length() - 4);
}` }
  ] },
{ q:"Question 2", label:"Class Design",
  intro:"<p>Write the complete <code>ParkingMeter</code> class. A meter holds a number of paid minutes, up to a maximum, and starts at 0 minutes.</p><ul><li>The constructor takes the maximum number of minutes as an int parameter.</li><li><code>addQuarters(int q)</code> adds 15 minutes for each quarter, but the minutes never go above the maximum. It returns nothing.</li><li><code>tick()</code> is called once a minute. It takes away 1 minute if any are left.</li><li><code>isExpired()</code> returns <code>true</code> when no minutes are left.</li><li><code>getMinutes()</code> returns the minutes left.</li></ul><div class=\"tablewrap\"><table><tr><th>Statement</th><th>Value returned</th><th>Minutes after</th></tr><tr><td><code>ParkingMeter m = new ParkingMeter(60);</code></td><td></td><td>0</td></tr><tr><td><code>m.isExpired()</code></td><td>true</td><td>0</td></tr><tr><td><code>m.addQuarters(3)</code></td><td></td><td>45</td></tr><tr><td><code>m.addQuarters(2)</code></td><td></td><td>60</td></tr><tr><td><code>m.tick()</code></td><td></td><td>59</td></tr><tr><td><code>m.isExpired()</code></td><td>false</td><td>59</td></tr><tr><td><code>m.getMinutes()</code></td><td>59</td><td>59</td></tr></table></div>",
  code:"",
  parts:[
    { label:"", prompt:"Write the complete <code>ParkingMeter</code> class, including the instance variables, the constructor, and the four methods.",
      pts:["Declares private instance variables for the maximum and the minutes left","Constructor sets the maximum from its parameter and starts the minutes at 0","addQuarters adds 15 minutes for each quarter","addQuarters never lets the minutes go above the maximum","tick takes away 1 minute only when minutes are left (never below 0)","isExpired returns true exactly when no minutes are left","getMinutes returns the minutes left; all headers are public with correct return types"],
      sample:`public class ParkingMeter
{
    private int max;
    private int minutes;

    public ParkingMeter(int maxMinutes)
    {
        max = maxMinutes;
        minutes = 0;
    }

    public void addQuarters(int q)
    {
        minutes += 15 * q;
        if (minutes > max)
        {
            minutes = max;
        }
    }

    public void tick()
    {
        if (minutes > 0)
        {
            minutes--;
        }
    }

    public boolean isExpired()
    {
        return minutes == 0;
    }

    public int getMinutes()
    {
        return minutes;
    }
}` }
  ] },
{ q:"Question 3", label:"Data Analysis with ArrayList",
  intro:"<p>A teacher keeps test results in a <code>GradeBook</code>. The <code>Result</code> class is shown below. You will write one method of the <code>GradeBook</code> class.</p>",
  code:`public class Result
{
    /** Returns the student's name */
    public String getName() { /* implementation not shown */ }

    /** Returns the student's score */
    public int getScore() { /* implementation not shown */ }

    // There may be instance variables, constructors, and methods that are not shown.
}

public class GradeBook
{
    /** The test results. Contains at least one Result. */
    private ArrayList<Result> results;

    /** Returns a new list of the names of the students whose score is
     *  greater than the average score, as described below. */
    public ArrayList<String> aboveAverage()
    { /* to be implemented */ }

    // There may be instance variables, constructors, and methods that are not shown.
}`,
  parts:[
    { label:"", prompt:"Write <code>aboveAverage</code>. The names must be in the same order as in <code>results</code>, and <code>results</code> must not be changed. For example, if the results are Ana 90, Ben 70, Cy 85, and Dee 75, the average is 80 and the method returns <code>[\"Ana\", \"Cy\"]</code>.",
      pts:["Traverses results and adds up getScore() for every Result","Computes the average correctly as a double (no integer division)","Traverses results again and compares each score with the average","Creates a new ArrayList<String> and adds the names of students above the average, in order","Returns the new list without changing results"],
      sample:`public ArrayList<String> aboveAverage()
{
    int total = 0;
    for (Result r : results)
    {
        total += r.getScore();
    }
    double avg = (double) total / results.size();

    ArrayList<String> names = new ArrayList<String>();
    for (Result r : results)
    {
        if (r.getScore() > avg)
        {
            names.add(r.getName());
        }
    }
    return names;
}` }
  ] },
{ q:"Question 4", label:"2D Array",
  intro:"<p>A grayscale picture is stored as a 2D array of brightness values from 0 (black) to 255 (white). You will write one method of the <code>Picture</code> class.</p>",
  code:`public class Picture
{
    /** pixels[r][c] is the brightness of the pixel in row r, column c.
     *  pixels is rectangular with at least one row and one column. */
    private int[][] pixels;

    /** Returns the index of the column with the greatest total brightness.
     *  If two or more columns tie, returns the smallest of their indexes. */
    public int brightestColumn()
    { /* to be implemented */ }

    // There may be instance variables, constructors, and methods that are not shown.
}`,
  parts:[
    { label:"", prompt:"Write <code>brightestColumn</code>. For example, if <code>pixels</code> is <code>{ {10, 200, 30}, {20, 100, 250}, {30, 0, 20} }</code>, the column totals are 60, 300, and 300, so the method returns 1.",
      pts:["Traverses every column of pixels (column-major order)","Adds up all the values in one column without going out of bounds","Starts the total at 0 for each new column","Compares each column total with the best total found so far","Keeps the smallest index when there is a tie (uses > rather than >=)","Returns the index of the brightest column"],
      sample:`public int brightestColumn()
{
    int bestCol = 0;
    int bestTotal = -1;
    for (int c = 0; c < pixels[0].length; c++)
    {
        int total = 0;
        for (int r = 0; r < pixels.length; r++)
        {
            total += pixels[r][c];
        }
        if (total > bestTotal)
        {
            bestTotal = total;
            bestCol = c;
        }
    }
    return bestCol;
}` }
  ] }
]
};
