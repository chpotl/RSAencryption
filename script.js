const { BigNumber } = require('ethers');

function isPrime(num) {
  for (let j = 2, n = Math.sqrt(num); j <= n; j++) {
    if (num % j === 0) {
      return false;
    }
  }
  return num;
}
function getRandomNumbers(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function gcd(a, b) {
  if (a == 0) return b;
  return gcd(b % a, a);
}

function modInv(u, v) {
  let u1 = 1;
  let u3 = u;
  let v1 = 0;
  let v3 = v;
  let iter = 1;
  while (v3 != 0) {
    q = Math.floor(u3 / v3);
    t3 = u3 % v3;
    t1 = u1 + q * v1;
    u1 = v1;
    v1 = t1;
    u3 = v3;
    v3 = t3;
    iter--;
  }
  if (u3 != 1) {
    return 0;
  }
  if (iter < 0) {
    inv = v - u1;
  } else {
    inv = u1;
  }
  return inv;
}

function getEncryptionKey(phiN, N) {
  for (let i = 2; i < phiN; i++) {
    if (gcd(i, phiN) === 1 && gcd(i, N) === 1) {
      return i;
    }
  }
}

function getPrime(len) {
  primeArr = [];
  for (let i = 10 ** (len - 1); i < 10 ** len; i++) {
    if (isPrime(i)) {
      primeArr.push(i);
    }
  }
  return [primeArr[getRandomNumbers(0, primeArr.length)]];
}
//---------Changpeng Zhao-------
const k = 3;
const prime1 = getPrime(k);
const prime2 = getPrime(k);
const n = prime1 * prime2;
const phiN = (prime1 - 1) * (prime2 - 1);
const encyptionKey = getEncryptionKey(phiN, n);
const decryptionKey = modInv(encyptionKey, phiN);
console.log(
  'Changpeng Zhao sending public key to Brian Armstrong: ',
  n,
  encyptionKey
);

//---------Brian Armstrong-------
const m = 5; //less than n-1
const encryptedMessage = BigNumber.from(m).pow(encyptionKey).mod(n);
console.log('\nencrypting....');
console.log(
  'Brian Armstrong sending message to Changpeng Zhao: ',
  encryptedMessage.toString()
);

//---------Changpeng Zhao-------
const decryptedMessage = encryptedMessage.pow(decryptionKey).mod(n);
console.log('\nChangpeng Zhao decypring...');
console.log('message is: ', decryptedMessage.toString());
