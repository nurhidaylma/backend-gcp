const initialMemoryUsage = process.memoryUsage().heapUsed;
const myName = process.argv[2];
const environment = process.env.NODE_ENV;

for (let i = 0; i <= 10000; i++) {
  // This looping process will increase memory usage
}

const currentMemoryUsage = process.memoryUsage().heapUsed;

console.log(`Hai, ${myName}`);
console.log(`Mode environment: ${environment}`);
console.log(`Memory usage was ${initialMemoryUsage} and increased to ${currentMemoryUsage}`);