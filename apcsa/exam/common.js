/* Shared helpers for the AP CSA practice exams and the printable booklets:
   HTML escaping, Java code blocks, and a Java quick reference written for CyberTeaches. */
(function(){
"use strict";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
function code(src){return '<pre class="code">'+esc(src)+'</pre>';}
/* An answer choice is shown as code when it looks like Java (has (, ;, [, = or quotes) and is short. */
function looksCode(s){return /^[\w"'\[\]{}().,;:+\-*\/%!<>=&| ]+$/.test(s)&&/[()\[\];="]|&&|\|\||[<>]=?/.test(s)&&!/^[A-Z][a-z]+ [a-z]+ [a-z]/.test(s)&&s.length<70;}
function row(sig,what){return '<tr><td><code>'+esc(sig)+'</code></td><td>'+what+'</td></tr>';}
var REF='<div class="ref"><p>The exam lets you use a Java quick reference. This summary lists the library classes and methods you are expected to know, in our own words.</p>'+
'<h4>String</h4><div class="tablewrap"><table>'+
row('String(String str)','Makes a new String with the same characters as str.')+
row('int length()','Returns the number of characters.')+
row('String substring(int from, int to)','Returns the characters from index from up to, but not including, index to.')+
row('String substring(int from)','Returns the characters from index from to the end.')+
row('int indexOf(String str)','Returns the index of the first time str appears, or -1 if it does not appear.')+
row('boolean equals(Object other)','Returns true if the two Strings have the same characters in the same order.')+
row('int compareTo(String other)','Returns a negative number if this String comes before other in dictionary order, 0 if they are equal, and a positive number if it comes after.')+
row('String[] split(String del)','Returns an array of the pieces of the String between each del.')+
'</table></div><h4>Integer and Double</h4><div class="tablewrap"><table>'+
row('Integer.MIN_VALUE, Integer.MAX_VALUE','The smallest and largest values an int can hold.')+
row('static int parseInt(String s)','Returns the int that the digits in s represent.')+
row('static double parseDouble(String s)','Returns the double that s represents.')+
row('int intValue(), double doubleValue()','Return the primitive value stored in an Integer or a Double.')+
'</table></div><h4>Math</h4><div class="tablewrap"><table>'+
row('static int abs(int x), static double abs(double x)','Returns the absolute value.')+
row('static double pow(double base, double exp)','Returns base raised to the power exp.')+
row('static double sqrt(double x)','Returns the square root of x.')+
row('static double random()','Returns a double that is at least 0.0 and less than 1.0.')+
'</table></div><h4>ArrayList&lt;E&gt;</h4><div class="tablewrap"><table>'+
row('int size()','Returns the number of elements.')+
row('boolean add(E obj)','Adds obj to the end and returns true.')+
row('void add(int index, E obj)','Inserts obj at index; elements from index on move right one place.')+
row('E get(int index)','Returns the element at index.')+
row('E set(int index, E obj)','Replaces the element at index with obj and returns the old element.')+
row('E remove(int index)','Removes and returns the element at index; later elements move left one place.')+
'</table></div><h4>Object</h4><div class="tablewrap"><table>'+
row('boolean equals(Object other)','Returns true if the objects are considered equal.')+
row('String toString()','Returns a String that describes the object.')+
'</table></div><h4>File and Scanner</h4><div class="tablewrap"><table>'+
row('File(String pathname)','Represents the file with that name.')+
row('Scanner(File f)','Makes a Scanner that reads from the file.')+
row('int nextInt(), double nextDouble(), boolean nextBoolean()','Read the next value of that type.')+
row('String nextLine(), String next()','Read the rest of the line, or the next word.')+
row('boolean hasNext()','Returns true if there is more input to read.')+
row('void close()','Closes the Scanner.')+
'</table></div></div>';
window.CSA={esc:esc,code:code,looksCode:looksCode,REF:REF};
})();
