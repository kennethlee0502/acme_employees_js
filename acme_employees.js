const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
];

const spacer = (text) => {
  if (!text) {
    return console.log("");
  }
  const stars = new Array(5).fill("*").join("");
  console.log(`${stars} ${text} ${stars}`);
};

spacer("findEmployeeByName Moe");
function findEmployeeByName(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === str) {
      return arr[i];
    }
  }
}

// given a name and array of employees, return employee
console.log(findEmployeeByName("moe", employees)); //{ id: 1, name: 'moe' }
spacer("");

spacer("findManagerFor Shep Jr.");
function findManagerFor(obj, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === obj.managerId) {
      return arr[i];
    }
  }
}

//given an employee and a list of employees, return the employee who is the manager
console.log(
  findManagerFor(findEmployeeByName("shep Jr.", employees), employees)
); //{ id: 4, name: 'shep', managerId: 2 }
spacer("");

spacer("findCoworkersFor Larry");
function findCoworkersFor(obj, employee) {
  let result = [];
  for (let i = 0; i < employee.length; i++) {
    if (
      employee[i].managerId === obj.managerId &&
      employee[i].name !== obj.name
    ) {
      result.push(employee[i]);
    }
  }
  return result;
}

//given an employee and a list of employees, return the employees who report to the same manager
console.log(
  findCoworkersFor(findEmployeeByName("larry", employees), employees)
); /*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer("");

spacer("findManagementChain for moe");
function findManagementChainForEmployee(obj, employee) {
  const result = [];
  if (!obj.managerId) {
    return result;
  } else {
    let manager = employee.find((word) => {
      return obj.managerId === word.id;
    });
    const chain = findManagementChainForEmployee(manager, employee);
    return [...chain, manager];
  }
}

//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(
  findManagementChainForEmployee(
    findEmployeeByName("moe", employees),
    employees
  )
); //[  ]
spacer("");

spacer("findManagementChain for shep Jr.");
console.log(
  findManagementChainForEmployee(
    findEmployeeByName("shep Jr.", employees),
    employees
  )
); /*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer("");

spacer("generateManagementTree");
function generateManagementTree(employee) {
  let noManagerId = employee.find((moe) => {
    moe.report = [];
    return moe.managerId === undefined;
  }); //find moe
  console.log(noManagerId);
  for (let i = 0; i < employee.length; i++) {
    if (noManagerId.id === employee[i].managerId) {
      let char = employee[i]; //find anyone who has the manager id as meo;id
    }
  }
}
// const employees = [
//   { id: 1, name: "moe" },
//   { id: 2, name: "larry", managerId: 1 },
//   { id: 4, name: "shep", managerId: 2 },
//   { id: 3, name: "curly", managerId: 1 },
//   { id: 5, name: "groucho", managerId: 3 },
//   { id: 6, name: "harpo", managerId: 5 },
//   { id: 8, name: "shep Jr.", managerId: 4 },
//   { id: 99, name: "lucy", managerId: 1 },
// ];
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer("");

spacer("displayManagementTree");
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees)); /*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
