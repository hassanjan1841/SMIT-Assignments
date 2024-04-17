// string length calculation
var str1 = "hello world";
console.log(str1.length);

//string to uppercase
var str2 = "hello world";
console.log(str2.toUpperCase());

//string to lowercase
var str3 = "HELLO WORLD";
console.log(str3.toLowerCase());

//count specific character
var str4 = "hello world";
console.log(str4.split("o").length - 1);

//substring extraction
var str5 = "hello world";
console.log(str5.slice(0, 5));

//capitalize each word
var str6 = "hello world";
var str6Arr = str6.split(" ");
var str6ArrCap = [];
for (var i = 0; i < str6Arr.length; i++) {
  str6ArrCap.push(str6Arr[i].charAt(0).toUpperCase() + str6Arr[i].slice(1));
}
console.log(str6ArrCap.join(" "));

//trim whitespace
var str7 = " hello world ";
console.log(str7.trim());

//count vowels and consonants
var str8 = "hello world";
var vowels = "aeiou";
var vowelsCount = 0;
var consonantsCount = 0;
for (var i = 0; i < str8.length; i++) {
  if (vowels.includes(str8[i])) {
    vowelsCount++;
  } else {
    consonantsCount++;
  }
}
console.log("Vowels: " + vowelsCount + " Consonants: " + consonantsCount);

//remove duplicates
var str9 = "hello world hald";
var str9Arr = str9.split("");
var str9ArrUnique = [];
for (var i = 0; i < str9Arr.length; i++) {
  if (!str9ArrUnique.includes(str9Arr[i])) {
    str9ArrUnique.push(str9Arr[i]);
  }
}
console.log(str9ArrUnique.join(""));

//word count in string
var str10 = "hello world hello";
var str10Arr = str10.split(" ");
console.log(str10Arr.length);

//remove all instances
var str11 = "hello world hello";
console.log(str11.replace(/hello/g, ""));

//extract numbrs
var str12 = "hello 123 world 456";
var str12Arr = str12.split(" ");
var str12ArrNum = [];
for (var i = 0; i < str12Arr.length; i++) {
  if (!isNaN(str12Arr[i])) {
    str12ArrNum.push(str12Arr[i]);
  }
}
console.log(str12ArrNum.join(" "));

//title case conversion
var str6 = "hello world";
var str6Arr = str6.split(" ");
var str6ArrCap = [];
for (var i = 0; i < str6Arr.length; i++) {
  str6ArrCap.push(str6Arr[i].charAt(0).toUpperCase() + str6Arr[i].slice(1));
}
console.log(str6ArrCap.join(" "));

//unique characters
var str13 = "hello world";
var str13Arr = str13.split("");
var str13ArrUnique = [];
for (var i = 0; i < str13Arr.length; i++) {
  if (!str13ArrUnique.includes(str13Arr[i])) {
    str13ArrUnique.push(str13Arr[i]);
  }
}
console.log(str13ArrUnique.join(""));
// Path: all-assignments/javascript-assignments/third-assignment/index.html
