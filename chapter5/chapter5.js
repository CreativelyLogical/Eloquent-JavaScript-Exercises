var hello = function() {
  console.log('hello world');
}

/*
The dataset for this chapter
*/

var ANCESTRY_FILE = JSON.stringify([
  {"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"},
  {"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"},
  {"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"},
  {"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"},
  {"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null},
  {"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null},
  {"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"},
  {"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"},
  {"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"},
  {"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null},
  {"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"},
  {"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"},
  {"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"},
  {"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null},
  {"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"},
  {"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"},
  {"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
  {"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
  {"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null},
  {"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"},
  {"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"},
  {"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"},
  {"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
  {"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"},
  {"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
  {"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
  {"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"},
  {"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"},
  {"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
  {"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"},
  {"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"},
  {"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
  {"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"},
  {"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"},
  {"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}
])

// Exercise: Flattening
// Goal: 'Flatten' an array of arrays into a single array that has all the elements
// of the input arrays. Use reduce method in combination with the concat method

var flatten = function(arr) {
  return arr.reduce(function(arr1, arr2) {
    return arr1.concat(arr2);
  });
}


/*
Exercise: Mother-Child Age Difference
Goal: To find the average age difference between the mother and the child
(The age of the mother when the child is born), using the data set for this chapter
provided above.
*/

var ancestry = JSON.parse(ANCESTRY_FILE)

var ages = [];

// Finds the average of all elements in an array
var average = function(arr) {
  var sum = arr.reduce(function(a, b) {
    return a + b;
  });
  return sum / arr.length;
}

var motherChildAgeDiff = function(ancestry) {
  ancestry.forEach(function(person) {
    var personAge = person.born;
  //console.log('person: ' + person.name + ' was born on: ' + personAge);
    var personMother = person.mother;
    var motherInfo = ancestry.filter(function(mother) {
      return mother.name == personMother;
    });

    var motherAge = 0;
    if (motherInfo.length != 0)
      motherAge = motherInfo[0].born;
    else
      return
    ageDiff = Math.abs(motherAge - personAge);
    ages.push(ageDiff);
    console.log('The person %s is born on %d and the mother %s is born on %d', person.name, personAge, personMother, motherAge);
    // console.log('The average mother-child age difference is %d years', average(ageDiff));
    
  });  
  // console.log('The average mother-child age difference is %d', average(ages))
  return average(ages);
}


/*
Exercise: Historical Life Expectancy
Goal: To group the life expectancy of the people in the data set by centuries
*/

// Helper function, to determine if there already exists an object for a particular century
var centuryExists = function(century, arrOfCenturies) {
  var centuryExists = false;
  for (var centuryObj of arrOfCenturies) {
    if (centuryObj.deathCentury == century) {
      return centuryObj;
    }
  }
  return centuryExists;
}

var lifeExpectancy = function(ancestry) {

  var arrOfCenturies = [];

  ancestry.forEach(function(person) {
    personBorn = person.born;
    personDeath = person.died;
    century = Math.ceil(personDeath / 100);
    // console.log('This person died in the %dth century in %d', century, personDeath);
    if (arrOfCenturies.length == 0) {
      var object = {
        ages: [],
        deathCentury: null
      };
      object.ages.push(personDeath - personBorn)
      object.deathCentury = century;
      arrOfCenturies.push(object);
    }
    else {
      if (!centuryExists(century, arrOfCenturies)) {
        var object = {
          ages: [],
          deathCentury: null
        };
        object.ages.push(personDeath - personBorn)
        object.deathCentury = century;
        arrOfCenturies.push(object);
      } else {
        centuryExists(century, arrOfCenturies).ages.push(personDeath - personBorn);
      }
    }
  });

  // Sorting them by centuries
  arrOfCenturies.sort(function(a, b) {
    return a.deathCentury - b.deathCentury;
  })

  // add an average(avg) property to each object in the array
  arrOfCenturies.forEach(function(person) {
    person.avg = Math.round(person.ages.reduce(function(a, b) {
      return a + b;
    }) / person.ages.length, 1);
  });

  // Display the data, showing each century with their average life expectancy

  arrOfCenturies.forEach(function(person) {
    console.log('The life expectancy in the %dth century was %d years old', person.deathCentury, person.avg);
  })
}

