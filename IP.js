const inputIP = document.querySelector('.inputIp')
const inputSubnet = document.querySelector('.inputSubnet')
const calculateIp = document.querySelector('.calculate')
const calculateResult = document.querySelector('.calculateResult')
const calculation = document.querySelector('.calculation')
const desc = document.querySelector('.desc')
const timeExecution = document.querySelector('.timeExecution')
const beforeCalculations = document.querySelector('.beforeCalculations')
const stepCalculate = document.querySelector('.stepCalculate')
const regex = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
const regexBinary = '([^0-9]|^)1234([^0-9]|$)'
let valueIp = ''
let valueSubnet = ''
const ClassIP = {
  __24: 256,
  __25: 128,
  __26: 64,
  __27: 32,
  __28: 16,
  __29: 8,
  __30: 4,
  __31: 2,
  __32: 1,
}
function ipAddrToBinary(ipAddr) {
  let array = []
  let binary = []
  const afterSplit = ipAddr.split('.')
  array = afterSplit
  array.forEach((element, i) => {
    const ipAddrInt = parseInt(element)
    binary[i] = ipAddrInt.toString(2)
  })
  return binary.join('.')
}
function netMaskToBinary(netmask) {
  let array = []
  let binary = []
  const afterSplit = netmask.split('.')
  array = afterSplit
  array.forEach((element, i) => {
    const netmaskInt = parseInt(element)
    binary[i] = netmaskInt.toString(2)
  })
  return binary.join('.')
}
function calculate(ip, prefix) {
  let start = window.performance.now();
  let firstIPArray = null
  let lastIPArray = null
  let subnetMask = null
  const usableHostIpRange = {
    first: null,
    last: null
  }
  const afterSplit = ip.split('.')
  const selectArray = parseInt(afterSplit[afterSplit.length - 1])
  const selectArray2 = parseInt(afterSplit[afterSplit.length - 2])
  const selectArray3 = parseInt(afterSplit[afterSplit.length - 3])
  const classC = prefix >= 24 && prefix <= 32
  const classB = prefix >= 16 && prefix <= 23
  const classA = prefix >= 8 && prefix <= 15
  console.log(typeof prefix,typeof ip)
  const content = (
    `
    <p class="note">Note : Cara perhitungan dibawah diambil dari proses perhitungan dibalik layar(Menggunakan Cara Baru) </p>`
  )
  if (classC && afterSplit[3] !== undefined) {
    desc.innerHTML = (content)
    beforeCalculations.innerHTML += (`<p>Prefix ${prefix} = ${ClassIP[`__${prefix}`]} IP</p>`)
    beforeCalculations.innerHTML += (`<p>4th Octet = ${afterSplit[3]}</p>`)
    stepCalculate.innerHTML += (`<tr><td>Total IP </td> <td>${ClassIP[`__${prefix}`]}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Calculate IP</td> <td>${selectArray} / ${ClassIP[`__${prefix}`]} = ${Math.floor(selectArray / ClassIP[`__${prefix}`])} * ${ClassIP[`__${prefix}`]} = ${Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]}</td></tr>`)
    const firstIP = Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]
    const lastIP = firstIP + ClassIP[`__${prefix}`] - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = firstIP
    firstIPArray = (copyArray)
    stepCalculate.innerHTML += (`<tr><td>IP firstResult</td> <td>${afterSplit.join('.')} 
    => ${firstIPArray.join('.')} </td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Calculate IP</td>  <td>${firstIP} + ${ClassIP[`__${prefix}`]} - 1 = ${firstIP + ClassIP[`__${prefix}`] - 1}</td></tr>`)
    copyArray2[3] = lastIP
    lastIPArray = (copyArray2)
    stepCalculate.innerHTML += (`<tr><td>IP lastResult <td>${afterSplit.join('.')} 
    => ${lastIPArray.join('.')} </td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>NETWORK ID (firstResult)</td><td>${firstIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>BROADCAST (lastResult)</td><td>${lastIPArray.join('.')}</td></tr>`)
    subnetMask = 256 - ClassIP[`__${prefix}`]
    stepCalculate.innerHTML += (`<tr><td>Subnet calculate</td> <td>256 - ${ClassIP[`__${prefix}`]} = ${256 - ClassIP[`__${prefix}`]}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Subnet result</td> <td>255.255.255.${subnetMask}</td></tr>`)
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    stepCalculate.innerHTML += (`<tr><td>RANGE IP </td> <td>${firstIPArray.join('.')} - ${lastIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>VALID HOST Range</td><td>${usableHostIpRange.first.join('.')} - ${usableHostIpRange.last.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Valid Host</td> <td>${(ClassIP[`__${prefix}`])} - 2 = ${(ClassIP[`__${prefix}`] - 2)}</td></tr>`)
    const results = (
      `
      <h3>Hasil</h3>
      <tr>
        <td>ip address</td>
        <td>${ip}</td>
      </tr>
      <tr>
        <td>ip address binary</td>
        <td>${ipAddrToBinary(ip)}</td>
      </tr>
      <tr>
        <td>range ip</td>
        <td>${firstIPArray.join('.') + " - " + lastIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>valid host</td>
        <td>${usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.')}</td>
      </tr>
      <tr>
        <td>network id</td>
        <td>${firstIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>broadcast</td>
        <td>${lastIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>subnet mask</td>
        <td>255.255.255.${subnetMask}</td>
      </tr>
      <tr>
        <td>subnet mask binary</td>
        <td>${netMaskToBinary(`255.255.255.${subnetMask}`)}</td>
      </tr>
      <tr>
        <td>hosts</td>
        <td>${ClassIP[`__${prefix}`]}</td>
      </tr>
      <tr>
        <td>valid hosts</td>
        <td>${(ClassIP[`__${prefix}`] - 2)}</td>
      </tr>
      <tr>
      `
    )
    calculateResult.innerHTML = results
    let end = window.performance.now();
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  } else if (classB && afterSplit[2] !== undefined) {
    desc.innerHTML = (content)
    const prefixInt = parseInt(prefix)
    const imaginer = parseInt(prefixInt + 8)
    beforeCalculations.innerHTML += (`<p>Imaginer Prefix ${prefix} = ${imaginer} = ${ClassIP[`__${imaginer}`]} IP</p>`)
    beforeCalculations.innerHTML += (`<p>3rd Octet = ${afterSplit[2]}</p>`)
    stepCalculate.innerHTML += (`<tr><td>imaginer</td><td>${prefix} + 8 = ${prefixInt + 8}</td></tr>`)
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 256
    stepCalculate.innerHTML += (`<tr><td>total IP </td> <td>  ${IPclass} * 256 = ${totalIP}</td></tr>`)
    const firstIP = Math.floor(selectArray2 / IPclass) * IPclass
    stepCalculate.innerHTML += (`<tr><td>Calculate IP </td> <td> ${selectArray2} / ${IPclass} = ${Math.floor(selectArray2 / IPclass)} * ${IPclass} = ${Math.floor(selectArray2 / IPclass) * IPclass}</td></tr>`)
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = 0
    copyArray[2] = firstIP
    firstIPArray = copyArray
    stepCalculate.innerHTML += (`<tr><td>IP firstResult</td> <td>${afterSplit.join('.')} => ${firstIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Calculate IP</td> <td>${firstIP} + ${IPclass} - 1 = ${firstIP + IPclass - 1}</td></tr>`)
    copyArray2[3] = 255
    copyArray2[2] = lastIP
    lastIPArray = copyArray2
    stepCalculate.innerHTML += (`<tr><td>IP lastResult</td> <td>${afterSplit.join('.')} => ${lastIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>NETWORK ID (firstResult) </td> <td>${firstIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>BROADCAST (lastResult)</td>  <td>${lastIPArray.join('.')}</td></tr>`)
    subnetMask = 256 - IPclass
    stepCalculate.innerHTML += (`<tr><td>Subnet calculate</td>  <td>256 - ${IPclass} = ${subnetMask}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>SUBNET MASK </td> <td>255.255.${subnetMask}.0</td></tr>`)
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    stepCalculate.innerHTML += (`<tr><td>RANGE IP </td> <td>${firstIPArray.join('.')} - ${lastIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>VALID HOST Range</td> <td>${usableHostIpRange.first.join('.')} - ${usableHostIpRange.last.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Valid Host </td> <td>${(totalIP)} - 2 = ${(totalIP - 2)}</td></tr>`)
    const results = (
      `
    <h3>Hasil</h3>
    <tr>
      <td>ip address</td>
      <td>${ip}</td>
    </tr>
    <tr>
      <td>ip address binary</td>
      <td>${ipAddrToBinary(ip)}</td>
    </tr>
    <tr>
      <td>range ip</td>
      <td>${firstIPArray.join('.') + " - " + lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>valid host</td>
      <td>${usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.')}</td>
    </tr>
    <tr>
      <td>network id</td>
      <td>${firstIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>broadcast</td>
      <td>${lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>subnet mask</td>
      <td>255.255.${subnetMask}.0</td>
    </tr>
    <tr>
      <td>subnet mask binary</td>
      <td>${netMaskToBinary(`255.255.${subnetMask}.0`)}</td>
    </tr>
    <tr>
      <td>hosts</td>
      <td>${totalIP}</td>
    </tr>
    <tr>
      <td>valid hosts</td>
      <td>${(totalIP - 2)}</td>
    </tr>`
    )
    calculateResult.innerHTML = results
    let end = window.performance.now();
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }else if(classA && afterSplit[1] !== undefined){
    desc.innerHTML = (content)
    const prefixInt = parseInt(prefix)
    const imaginer = prefixInt + 16
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 65536
    beforeCalculations.innerHTML += (`<p>Imaginer Prefix ${prefix} = ${imaginer} = ${ClassIP[`__${imaginer}`]} IP</p>`)
    beforeCalculations.innerHTML += (`<p>2nd Octet = ${afterSplit[1]}</p>`)
    stepCalculate.innerHTML += `<tr><td>Imaginer</td><td>${prefixInt} + 16 = ${imaginer}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Total IP </td><td>${IPclass} * 512 = ${totalIP}</td></tr>`
    const firstIP = Math.floor(selectArray3 / IPclass) * IPclass
    stepCalculate.innerHTML += (`<tr><td>Calculate IP </td> <td> ${selectArray3} / ${IPclass} = ${Math.floor(selectArray3 / IPclass)} * ${IPclass} = ${Math.floor(selectArray3 / IPclass) * IPclass}</td></tr>`)
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[1] = firstIP
    copyArray[2] = 0
    copyArray[3] = 0
    firstIPArray = copyArray
    stepCalculate.innerHTML += (`<tr><td>IP firstResult</td> <td>${afterSplit.join('.')} => ${firstIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Calculate IP</td> <td>${firstIP} + ${IPclass} - 1 = ${firstIP + IPclass - 1}</td></tr>`)
    copyArray2[1] = lastIP
    copyArray2[2] = 255
    copyArray2[3] = 255
    lastIPArray = copyArray2
    stepCalculate.innerHTML += (`<tr><td>IP lastResult</td> <td>${afterSplit.join('.')} => ${lastIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>NETWORK ID (firstResult) </td> <td>${firstIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>BROADCAST (lastResult)</td>  <td>${lastIPArray.join('.')}</td></tr>`)
    subnetMask = 256 - IPclass
    stepCalculate.innerHTML += (`<tr><td>Subnet calculate</td>  <td>256 - ${IPclass} = ${subnetMask}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>SUBNET MASK </td> <td>255.${subnetMask}.0.0</td></tr>`)
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    stepCalculate.innerHTML += (`<tr><td>RANGE IP </td> <td>${firstIPArray.join('.')} - ${lastIPArray.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>VALID HOST Range</td> <td>${usableHostIpRange.first.join('.')} - ${usableHostIpRange.last.join('.')}</td></tr>`)
    stepCalculate.innerHTML += (`<tr><td>Valid Host </td> <td>${(totalIP)} - 2 = ${(totalIP - 2)}</td></tr>`)
    const results = (
      `
    <h3>Hasil</h3>
    <tr>
      <td>ip address</td>
      <td>${ip}</td>
    </tr>
    <tr>
      <td>ip address binary</td>
      <td>${ipAddrToBinary(ip)}</td>
    </tr>
    <tr>
      <td>range ip</td>
      <td>${firstIPArray.join('.') + " - " + lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>valid host</td>
      <td>${usableHostIpRange.first.join('.') + ' - ' + usableHostIpRange.last.join('.')}</td>
    </tr>
    <tr>
      <td>network id</td>
      <td>${firstIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>broadcast</td>
      <td>${lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>subnet mask</td>
      <td>255.${subnetMask}.0.0</td>
    </tr>
    <tr>
      <td>subnet mask binary</td>
      <td>${netMaskToBinary(`255.${subnetMask}.0.0`)}</td>
    </tr>
    <tr>
      <td>hosts</td>
      <td>${totalIP}</td>
    </tr>
    <tr>
      <td>valid hosts</td>
      <td>${(totalIP - 2)}</td>
    </tr>`
    )
    calculateResult.innerHTML = results
    let end = window.performance.now();
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }
}
function validation(valueIp,valueSubnet) {
  beforeCalculations.innerHTML = ''
  stepCalculate.innerHTML = ''
  calculateResult.innerHTML = ''
  desc.innerHTML = ''
  if (valueIp.match(regex) === null || valueSubnet === '') {
    return true
  } else {
    return false
  }
}
function handleInput(e) {
  valueIp = e.target.value
  if (validation(valueIp, valueSubnet) === true) {
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleInputSubnet(e) {
  valueSubnet = e.target.value
  if (validation(valueIp, valueSubnet) === true) {
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleCalculate() {
  if (validation(valueIp, valueSubnet) === true) {
    alert("IP/SUBNET TIDAK VALID!!!")
    return
  }
  calculate(valueIp, valueSubnet)
}
inputIP.addEventListener('input', handleInput)
inputSubnet.addEventListener('input', handleInputSubnet)
calculateIp.addEventListener('click', handleCalculate)