const data = [
    {0: {name: 'Sunday', Total: 0}},
    {1: {name: 'Monday', Total: 120}},
    {2: {name: 'Tuesday', Total: 450}},
    {3: {name: 'Wednesday', Total: 650}},
    {4: {name: 'Thursday', Total: 1000}},
    {5: {name: 'Friday', Total: 350}},
    {6: {name: 'Saturday', Total: 500}}
];

const toDate = new Date();
const todayDate = toDate.getDay();

// Rearrange the array to start from todayDate's index
const sortedData = [
    ...data.slice(todayDate),
    ...data.slice(0, todayDate)
];

console.log(sortedData.reverse());