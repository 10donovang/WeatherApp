function Mean(numArray, length)
{
  var total = numArray.reduce(function(a, b)
    {
        return a + b;
    }, 0);
  return total/length;

}

function Median(numArray, length)
{
  if(length % 2 == 0)
    return numArray[length/2];
  else
    return (numArray[Math.ceil(length/2-1)]+numArray[Math.floor(length/2+1)])/2
}

function Mode(numArray)
{
 var instancesOfNums = {};
 for (const num of numArray)
 {
   instancesOfNums[num] ? instancesOfNums[num]++ : instancesOfNums[num] = 1;
 }
 var mode;

 var compare = 0;
 var counter = 0;
 for (const num of Object.keys(instancesOfNums))
 {
   if(instancesOfNums[num] > compare)
   {
     mode = num;
     compare = instancesOfNums[num];
     counter ++;
   }
 }
 if (counter <= 1)
 {
   mode = "No Mode";
 }
 return mode;
}

module.exports = { Mean, Median, Mode };
