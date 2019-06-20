// module.exports = () => {
//   ...
// };
let validate = false;
let stats = false;

process.argv.forEach((options, i, arr) => {
console.log("i:", i, "value:", options)
if (i>1 && i<5){
  if (i==="--validate") {
    validate = true; 
  } 
}
})