const { log } = require('console');
const readline = require('readline');

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// TODO: Move all magic strings to conts, refactor  
const units = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
const tens = ["dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingts", "quatre-vingt-dix"];

function numbersToFrenchWords(number){

    if(IsUnits(number)) return units[number];  
    //tens
    if(IsTens(number)) return TensBusinessLogic(number); 
    //hundreds
    if(IsHundreds(number)) return HundredsBusinessLogic(number);
    //thousands
    if(IsThousandsOrGreater(number)) return ThousandsBusinessLogic(number);
}

function IsUnits(number){
  return number >= 0 && number < 17;
}

function IsTens(number){
 return number >= 17 && number < 100;
}

function TensBusinessLogic(number){
  if(number < 70){
    return TensLessThan70(number);
  }
  else if(number < 80)  {
    return `soxiante-${numbersToFrenchWords(number - 60)}`;
  }
  else if(number < 100){
    return `quatre-vingt-${numbersToFrenchWords(number - 80)}`;
  }
}

function TensLessThan70(number){
  let ten = Math.floor(number / 10);
  let unit = number % 10;
  if(unit === 0){
    return tens[ten - 1]
  }
  else if(number % 10 == 1 && number != 81 || number % 10 == 1 && number != 91 ){
    return `${tens[ten - 1]}-et-${units[unit]}`;
  }
  else{
    return `${tens[ten - 1]}-${units[unit]}`; 
  }
}

function HundredsBusinessLogic(number){
  if(number == 100) return 'cent';
  if(number < 200) return `cent-${numbersToFrenchWords(number % 100)}`;
  if(number % 100 === 0) return `${units[Math.floor(number / 100)]}-cents`;
  return numbersToFrenchWords(Math.floor(number / 100)) + "-cents-" + numbersToFrenchWords(number % 100);
}

function ThousandsBusinessLogic(number){
  if(number == 1000) return 'mille';
  if(number < 2000) return `mille-${numbersToFrenchWords(number % 1000)}`;
  if(number % 1000 === 0) return `${units[Math.floor(number / 1000)]}-miles`;
  return numbersToFrenchWords(Math.floor(number / 1000)) + "-miles-" + numbersToFrenchWords(number % 1000);
}

function IsHundreds(number){
  return number >= 100 && number < 1000;
}

function IsThousandsOrGreater(number){
  return number >= 1000;
}

function IsValid(input){
  return input !== '';
}

readLine.question('Enter a comma seperated list: ', (input) => {
    if(!IsValid(input)){
      error('Error: comma seperated list not provided or invalid'); 
      return readLine.close();
    }
    
    const numbers = input.trim().split(',').map(Number);
    const result = numbers.map(numbersToFrenchWords);
    log("Numbers to French words: ", result.join(', '));
    readLine.close();
  });
  