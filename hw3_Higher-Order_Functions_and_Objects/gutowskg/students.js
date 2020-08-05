// You are not permitted to change this in any way
function Student(name, major, yearInSchool, club) {
     this.name = name; // string, (e.g. "Jim", "Pam", "Michael")
     this.major = major; // string, (e.g. "Computer Science", "Art", "Business")
     this.yearInSchool = yearInSchool; // int, (e.g. 1, 2, 3, 4)
     this.club = club; // string, (e.g. "Improv", "Art")
}

Student.prototype.logMe = function(bool){ 
     if (bool) {
          console.log(this.name + ' - ' + this.major + ' - ' + this.yearInSchool + ' - ' + this.club);
     } else {
          console.log(this.name + ' - ' + this.major + ' - ' + this.yearInSchool);
     }
};

var students = [
     new Student("Pam", "Art", 2, "Art"),
     new Student("Michael", "Business", 4, "Improv"),
     new Student("Dwight", "Horticulture", 1, "Karate"),
     new Student("Jim", "Sports Science", 2, "Guitar"),
     new Student("Angela", "Accounting", 4, "Cat"),
     new Student("Toby", "Human Resources", 3, "Photography")
];

/* This function sorts arrays using an arbitrary comparator. You pass it a comparator
and an array of objects appropriate for that comparator and it will return a new array
which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array) {
     var length = array.length-1;

     do {
          var swap = false;
          for (var i = 0; i < length; i++) {
               if (comparator(array[i], array[i+1])) {
                    var temp = array[i];
                    array[i] = array[i+1];
                    array[i+1] = temp;
                    swap = true;
               }
	     }
          length--;
     } while (swap);
     
     return array;
}

/* For all comparators if students are 'tied' according to the comparison rules then the order of
those 'tied' students is not specified and either can come first*/

/* This compares two students based on their year in school. Sort in descending order.*/
function yearComparator(student1, student2) {
     if(student1.yearInSchool > student2.yearInSchool) {
          return false;
     } else {
          return true;   
	}
}

/* This compares two students based on their major. It should be case insensitive and
makes which are alphabetically earlier in the alphabet are "greater" than ones that
come later (from A-Z).*/
function majorComparator(student1, student2) {
     var s1Major = student1.major.toLowerCase();
     var s2Major = student2.major.toLowerCase();

     if (s1Major > s2Major) {
          return true;
	} else {
          return false;   
	}

     /*
     var i = 0;
     do {
          if (s1Major.charAt(i) > s2Major.charAt(i)) {
               return true;
		} else if (s1Major.charAt(i) == s2Major.charAt(i)) {
               i++;   
		} else {
               return false;   
		}
	} while (i > 0);
     */
}

/* This compares two students based on the club they're in. The ordering from "greatest"
to "least" is as follows: improv, cat, art, guitar, (types not otherwise listed).
It should be case insensitive. If two clubs are of equal type then the student who
has the higher year in school should be "greater."*/
function clubComparator(student1, student2) {
     var s1Club = clubRank(student1.club);
     var s2Club = clubRank(student2.club);
     
     if(s1Club == s2Club) {
          if(student1.yearInSchool > student1.yearInSchool) {
               return false;
          } else {
               return true;   
		}
	} else if (s1Club > s2Club) {
          return true;
	} else {
          return false;
	}
}

function clubRank(club) {
     club = club.toLowerCase();
     
     if (club === 'improv') {
          return 1;
	} else if (club === 'cat') {
          return 2;
	} else if (club === 'art') {
          return 3;
	} else if (club === 'guitar') {
          return 4;
	} else {
          return 5;
	}
}

/* Your program should output the following to the console.log, including each of the opening and closing
5 stars. All values in parenthesis should be replaced with appropriate values. To accomplish this, you will
have to sort the array of students using each comparator and then loop through the array and and call logMe
on each student of the now-sorted array. If the argument is 'true' then it prints the student's name, major,
year in school, and club affiliation. If the argument is 'false' then the club affiliation is ommited and
just the student's name, major and year in school is logged. Please carefully note which sorted results require
the club to be displayed and which do not.

**********
The students sorted by year in school are:
(Name - Major - Year) // of the "greatest" student
...
(Name - Major - Year) // of the "least" student

**********
The students sorted by major are:
(Name - Major - Year) // of the "greatest" student
...
(Name - Major - Year) // of the "least" student

**********
The students sorted by club affiliation are:
(Name - Major - Year - Club) // of the "greatest" student
...
(Name - Major - Year - Club) // of the "least" student

**********

As an example of what is expected to be printed to the console with logMe being sent True for a single student:
Jim - Sports Science - 2 - Guitar

*/

function printStudents(students, bool) {
     for (var i = 0; i < students.length; i++) {
          students[i].logMe(bool);
     }
}

console.log('\n' + '**********' + '\n' + 'The students sorted by year in school are:');

sortArr(yearComparator, students);
printStudents(students);

console.log('\n' + '**********' + '\n' + 'The students sorted by major are:');

sortArr(majorComparator, students);
printStudents(students);

console.log('\n' + '**********' + '\n' + 'The students sorted by club affiliation are:');

sortArr(clubComparator, students);
printStudents(students, true);

console.log('\n' + '**********');