import moment from "moment";

//Takes an array in ascending order of requestOff objects
//and groups whichever ones that are perfectlly sequential into an array

export default function processRequestOffs(orderedRequestOffs) {
  //will be using .push and .shift so making a copy
  let futureRequests = [...orderedRequestOffs];
  let finalProduct = [];

  while (futureRequests.length > 1) {
    //uses the length of the futureReq array as a flag
    //since it keeps shifting
    let newRequestGroup = [futureRequests.shift()];

    //if the next few items can be grouped in it does so if not it returns
    //1 request off
    const grouped = groupRequestOffs(newRequestGroup, futureRequests);
    finalProduct.push(grouped);
  }

  //while loop doesn't reach the final element so we add it here
  return [...finalProduct, ...futureRequests];
}

function groupRequestOffs(newRequestGroup, futureRequests) {
  //recursive function
  const req = moment(newRequestGroup[newRequestGroup.length - 1].date);
  const next = moment(futureRequests[0].date);

  if (next.diff(req, "days") === 1 && checkTimes(req, next)) {
    
    newRequestGroup.push(futureRequests.shift());
    groupRequestOffs(newRequestGroup, futureRequests);
  }

  return newRequestGroup.length > 1 ? newRequestGroup : newRequestGroup[0];
}

function checkTimes(first, s)
