const inputIP = document.querySelector('.inputIp')
const inputSubnet = document.querySelector('.inputSubnet')
const calculateIp = document.querySelector('.calculate')
const calculateResult = document.querySelector('.calculateResult')
const calculation = document.querySelector('.calculation')
const timeExecution = document.querySelector('.timeExecution')
const beforeCalculations = document.querySelector('.beforeCalculations')
const stepCalculate = document.querySelector('.stepCalculate')
const regex =
  '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
const regexBinary = '([^0-9]|^)1234([^0-9]|$)'
const inputBox = document.querySelector('.inputBox')
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
  let start = window.performance.now()
  let firstIPArray = null
  let lastIPArray = null
  let subnetMask = null
  let ipClass = ''
  let typeOfIp = ''
  const usableHostIpRange = {
    first: null,
    last: null,
  }
  const afterSplit = ip.split('.')
  const selectArray = parseInt(afterSplit[afterSplit.length - 1])
  const selectArray2 = parseInt(afterSplit[afterSplit.length - 2])
  const selectArray3 = parseInt(afterSplit[afterSplit.length - 3])
  const classC = prefix >= 24 && prefix <= 32
  const classB = prefix >= 16 && prefix <= 23
  const classA = prefix >= 8 && prefix <= 15
  const prefix31To32 = prefix >= 31 && prefix <= 32
  if (prefix >= 24 && prefix <= 32) {
    ipClass = 'C'
  } else if (prefix >= 16 && prefix <= 23) {
    ipClass = 'B'
  } else if (prefix >= 8 && prefix <= 15) {
    ipClass = 'A'
  }
  //public and private ip detection
  const selectArrayIndexOf1 = afterSplit[1]
  const MaxIpHost = selectArrayIndexOf1 >= 16 && selectArrayIndexOf1 <= 31
  if (parseInt(afterSplit[0]) === 10) {
    typeOfIp = 'Private'
  } else if (parseInt(afterSplit[0]) === 172 && MaxIpHost) {
    typeOfIp = 'Private'
  } else if (
    parseInt(afterSplit[0]) === 192 &&
    parseInt(afterSplit[1]) === 168
  ) {
    typeOfIp = 'Private'
  } else {
    typeOfIp = 'Public'
  }
  //End of public and private ip detection
  if (classC && afterSplit[3] !== undefined) {
    beforeCalculations.innerHTML += `<p>Prefix ${prefix} = ${
      ClassIP[`__${prefix}`]
    } IP</>`
    beforeCalculations.innerHTML += `<p>4th Octet = ${afterSplit[3]}</p>`
    beforeCalculations.innerHTML += `<p>Solutions :</p> `
    stepCalculate.innerHTML += `<tr><td>Total IP </td> <td>${
      ClassIP[`__${prefix}`]
    }</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate IP</td> <td>${selectArray} / ${
      ClassIP[`__${prefix}`]
    } = ${Math.floor(selectArray / ClassIP[`__${prefix}`])} * ${
      ClassIP[`__${prefix}`]
    } = ${
      Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]
    }</td></tr>`
    const firstIP =
      Math.floor(selectArray / ClassIP[`__${prefix}`]) * ClassIP[`__${prefix}`]
    const lastIP = firstIP + ClassIP[`__${prefix}`] - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = firstIP
    firstIPArray = copyArray
    stepCalculate.innerHTML += `<tr><td>IP firstResult</td> <td>${afterSplit.join(
      '.'
    )} 
    => ${firstIPArray.join('.')} </td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate IP</td>  <td>${firstIP} + ${
      ClassIP[`__${prefix}`]
    } - 1 = ${firstIP + ClassIP[`__${prefix}`] - 1}</td></tr>`
    copyArray2[3] = lastIP
    lastIPArray = copyArray2
    stepCalculate.innerHTML += `<tr><td>IP lastResult <td>${afterSplit.join(
      '.'
    )} 
    => ${lastIPArray.join('.')} </td></tr>`
    stepCalculate.innerHTML += `<tr><td>Network Address (firstResult)</td><td>${firstIPArray.join(
      '.'
    )}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Broadcast Address (lastResult)</td><td>${lastIPArray.join(
      '.'
    )}</td></tr>`
    subnetMask = 256 - ClassIP[`__${prefix}`]
    stepCalculate.innerHTML += `<tr><td>Subnet calculate</td> <td>256 - ${
      ClassIP[`__${prefix}`]
    } = ${256 - ClassIP[`__${prefix}`]}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Subnet result</td> <td>255.255.255.${subnetMask}</td></tr>`
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    if (prefix31To32) {
      usableHostIpRange.first = []
      usableHostIpRange.last = []
    }
    stepCalculate.innerHTML += `<tr><td>RANGE IP </td> <td>${firstIPArray.join(
      '.'
    )} - ${lastIPArray.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Usable Host IP Range</td><td>${usableHostIpRange.first.join(
      '.'
    )} - ${usableHostIpRange.last.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Valid Host</td> <td>${
      ClassIP[`__${prefix}`]
    } - 2 = ${
      ClassIP[`__${prefix}`] - 2 === -1 ? '0 N/A' : ClassIP[`__${prefix}`] - 2
    }</td></tr>`
    stepCalculate.innerHTML += `<tr><td>IP Class</td><td>/${prefix}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>CIDR Notation</td><td>${ipClass}</td></tr>`
    const results = `
      <h3 style="color : black">Results</h3>
      <tr>
        <td>IP Address</td>
        <td>${ip}</td>
      </tr>
      <tr>
        <td>IP Address Binary</td>
        <td>${ipAddrToBinary(ip)}</td>
      </tr>
      <tr>
        <td>Range IP</td>
        <td>${firstIPArray.join('.') + ' - ' + lastIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>Usable Host IP Range</td>
        <td>${
          usableHostIpRange.first.join('.') +
          ' - ' +
          usableHostIpRange.last.join('.')
        }</td>
      </tr>
      <tr>
        <td>Network Address</td>
        <td>${firstIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>Broadcast Address</td>
        <td>${lastIPArray.join('.')}</td>
      </tr>
      <tr>
        <td>Subnet Mask</td>
        <td>255.255.255.${subnetMask}</td>
      </tr>
      <tr>
        <td>Subnet Mask Binary</td>
        <td>${netMaskToBinary(`255.255.255.${subnetMask}`)}</td>
      </tr>
      <tr>
        <td>Total Number of Hosts</td>
        <td>${ClassIP[`__${prefix}`]}</td>
      </tr>
      <tr>
        <td>Number of Usable Hosts</td>
        <td>${
          ClassIP[`__${prefix}`] - 2 === -1
            ? '0  N/A'
            : ClassIP[`__${prefix}`] - 2
        }</td>
      </tr>
      <tr>
      <tr><td>IP Class</td><td>/${prefix}</td></tr>
      <tr><td>CIDR Notation</td><td>${ipClass}</td></tr>
      <tr><td>IP Type</td><td>${typeOfIp}</td></tr>
      `
    calculateResult.innerHTML = results
    let end = window.performance.now()
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  } else if (classB && afterSplit[2] !== undefined) {
    const prefixInt = parseInt(prefix)
    const imaginer = parseInt(prefixInt + 8)
    beforeCalculations.innerHTML += `<p>Imaginer Prefix ${prefix} = ${imaginer} = ${
      ClassIP[`__${imaginer}`]
    } IP</p>`
    beforeCalculations.innerHTML += `<p>3rd Octet = ${afterSplit[2]}</p>`
    beforeCalculations.innerHTML += `<p>Solutions :</p> `
    stepCalculate.innerHTML += `<tr><td>imaginer</td><td>${prefix} + 8 = ${
      prefixInt + 8
    }</td></tr>`
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 256
    const totalIpUsable = totalIP - 2
    stepCalculate.innerHTML += `<tr><td>total IP </td> <td>  ${IPclass} * 256 = ${totalIP}</td></tr>`
    const firstIP = Math.floor(selectArray2 / IPclass) * IPclass
    stepCalculate.innerHTML += `<tr><td>Calculate IP </td> <td> ${selectArray2} / ${IPclass} = ${Math.floor(
      selectArray2 / IPclass
    )} * ${IPclass} = ${Math.floor(selectArray2 / IPclass) * IPclass}</td></tr>`
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = 0
    copyArray[2] = firstIP
    firstIPArray = copyArray
    stepCalculate.innerHTML += `<tr><td>IP firstResult</td> <td>${afterSplit.join(
      '.'
    )} => ${firstIPArray.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate IP</td> <td>${firstIP} + ${IPclass} - 1 = ${
      firstIP + IPclass - 1
    }</td></tr>`
    copyArray2[3] = 255
    copyArray2[2] = lastIP
    lastIPArray = copyArray2
    stepCalculate.innerHTML += `<tr><td>IP lastResult</td> <td>${afterSplit.join(
      '.'
    )} => ${lastIPArray.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Network Address (firstResult) </td> <td>${firstIPArray.join(
      '.'
    )}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Broadcast Address (lastResult)</td>  <td>${lastIPArray.join(
      '.'
    )}</td></tr>`
    subnetMask = 256 - IPclass
    stepCalculate.innerHTML += `<tr><td>Subnet calculate</td>  <td>256 - ${IPclass} = ${subnetMask}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>SUBNET MASK </td> <td>255.255.${subnetMask}.0</td></tr>`
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    stepCalculate.innerHTML += `<tr><td>RANGE IP </td> <td>${firstIPArray.join(
      '.'
    )} - ${lastIPArray.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Usable Host IP Range</td> <td>${usableHostIpRange.first.join(
      '.'
    )} - ${usableHostIpRange.last.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Number of Usable Hosts </td> <td>${totalIP} - 2 = ${totalIpUsable.toLocaleString()}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>IP Class</td><td>/${prefix}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>CIDR Notation</td><td>${ipClass}</td></tr>`
    const results = `
    <h3 style="color : black">Results</h3>
    <tr>
      <td>IP Address</td>
      <td>${ip}</td>
    </tr>
    <tr>
      <td>IP Address Binary</td>
      <td>${ipAddrToBinary(ip)}</td>
    </tr>
    <tr>
      <td>Range IP</td>
      <td>${firstIPArray.join('.') + ' - ' + lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>Usable Host IP Range</td>
      <td>${
        usableHostIpRange.first.join('.') +
        ' - ' +
        usableHostIpRange.last.join('.')
      }</td>
    </tr>
    <tr>
      <td>Network Address</td>
      <td>${firstIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>Broadcast Address</td>
      <td>${lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>Subnet Mask</td>
      <td>255.255.${subnetMask}.0</td>
    </tr>
    <tr>
      <td>Subnet Mask Binary</td>
      <td>${netMaskToBinary(`255.255.${subnetMask}.0`)}</td>
    </tr>
    <tr>
      <td>Total Number of Hosts</td>
      <td>${totalIP.toLocaleString()}</td>
    </tr>
    <tr>
      <td>Number of Usable Hosts</td>
      <td>${totalIpUsable.toLocaleString()}</td>
    </tr>
    <tr><td>IP Class</td><td>/${prefix}</td></tr>
    <tr><td>CIDR Notation</td><td>${ipClass}</td></tr>
    <tr><td>IP Type</td><td>${typeOfIp}</td></tr>
    `
    calculateResult.innerHTML = results
    let end = window.performance.now()
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  } else if (classA && afterSplit[1] !== undefined) {
    const prefixInt = parseInt(prefix)
    const imaginer = prefixInt + 16
    const IPclass = ClassIP[`__${imaginer}`]
    const totalIP = IPclass * 65536
    const totalIpUsable = totalIP - 2
    beforeCalculations.innerHTML += `<p>Imaginer Prefix ${prefix} = ${imaginer} = ${
      ClassIP[`__${imaginer}`]
    } IP</p>`
    beforeCalculations.innerHTML += `<p>2nd Octet = ${afterSplit[1]}</p>`
    beforeCalculations.innerHTML += `<p>Solutions :</p> `
    stepCalculate.innerHTML += `<tr><td>Imaginer</td><td>${prefixInt} + 16 = ${imaginer}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Total IP </td><td>${IPclass} * 512 = ${totalIP}</td></tr>`
    const firstIP = Math.floor(selectArray3 / IPclass) * IPclass
    stepCalculate.innerHTML += `<tr><td>Calculate IP </td> <td> ${selectArray3} / ${IPclass} = ${Math.floor(
      selectArray3 / IPclass
    )} * ${IPclass} = ${Math.floor(selectArray3 / IPclass) * IPclass}</td></tr>`
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[1] = firstIP
    copyArray[2] = 0
    copyArray[3] = 0
    firstIPArray = copyArray
    stepCalculate.innerHTML += `<tr><td>IP firstResult</td> <td>${afterSplit.join(
      '.'
    )} => ${firstIPArray.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate IP</td> <td>${firstIP} + ${IPclass} - 1 = ${
      firstIP + IPclass - 1
    }</td></tr>`
    copyArray2[1] = lastIP
    copyArray2[2] = 255
    copyArray2[3] = 255
    lastIPArray = copyArray2
    stepCalculate.innerHTML += `<tr><td>IP lastResult</td> <td>${afterSplit.join(
      '.'
    )} => ${lastIPArray.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Network Address (firstResult) </td> <td>${firstIPArray.join(
      '.'
    )}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Broadcast Address (lastResult)</td>  <td>${lastIPArray.join(
      '.'
    )}</td></tr>`
    subnetMask = 256 - IPclass
    stepCalculate.innerHTML += `<tr><td>Subnet calculate</td>  <td>256 - ${IPclass} = ${subnetMask}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>SUBNET MASK </td> <td>255.${subnetMask}.0.0</td></tr>`
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    stepCalculate.innerHTML += `<tr><td>RANGE IP </td> <td>${firstIPArray.join(
      '.'
    )} - ${lastIPArray.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Usable Host IP Range</td> <td>${usableHostIpRange.first.join(
      '.'
    )} - ${usableHostIpRange.last.join('.')}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Number of Usable Hosts </td> <td>${totalIP} - 2 = ${totalIpUsable.toLocaleString()}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>IP Class</td><td>/${prefix}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>CIDR Notation</td><td>${ipClass}</td></tr>`
    const results = `
    <h3 style="color : black">Results</h3>
    <tr>
      <td>IP Address</td>
      <td>${ip}</td>
    </tr>
    <tr>
      <td>IP Address Binary</td>
      <td>${ipAddrToBinary(ip)}</td>
    </tr>
    <tr>
      <td>Range IP</td>
      <td>${firstIPArray.join('.') + ' - ' + lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>Usable Host IP Range</td>
      <td>${
        usableHostIpRange.first.join('.') +
        ' - ' +
        usableHostIpRange.last.join('.')
      }</td>
    </tr>
    <tr>
      <td>Network Address</td>
      <td>${firstIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>Broadcast Address</td>
      <td>${lastIPArray.join('.')}</td>
    </tr>
    <tr>
      <td>Subnet Mask</td>
      <td>255.${subnetMask}.0.0</td>
    </tr>
    <tr>
      <td>Subnet Mask Binary</td>
      <td>${netMaskToBinary(`255.${subnetMask}.0.0`)}</td>
    </tr>
    <tr>
      <td>Total Number of Hosts</td>
      <td>${totalIP.toLocaleString()}</td>
    </tr>
    <tr>
      <td>Number of Usable Hosts</td>
      <td>${totalIpUsable.toLocaleString()}</td>
    </tr>
    <tr><td>IP Class</td><td>/${prefix}</td></tr>
    <tr><td>CIDR Notation</td><td>${ipClass}</td></tr>
    <tr><td>IP Type</td><td>${typeOfIp}</td></tr>
    `
    calculateResult.innerHTML = results
    let end = window.performance.now()
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }
}
function validation(valueIp, valueSubnet) {
  beforeCalculations.innerHTML = ''
  stepCalculate.innerHTML = ''
  calculateResult.innerHTML = ''
  const afterSplit = valueIp.split('.')
  for (let i = 0; i < afterSplit.length; i++) {
    if (afterSplit[i] > 255) {
      return 'FAILURE'
    }
  }
  if (afterSplit.length === 2) {
    return 'FAILURE'
  }
  if (valueIp.match(regex) === null || valueSubnet === '') {
    return 'FAILURE'
  } else {
    return 'SUCCESS'
  }
}
function handleInput(e) {
  valueIp = e.target.value
  if (validation(valueIp, valueSubnet) === 'FAILURE') {
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleInputSubnet(e) {
  valueSubnet = e.target.value
  if (validation(valueIp, valueSubnet) === 'FAILURE') {
    return
  }
  calculate(valueIp, valueSubnet)
}
function handleCalculate() {
  if (validation(valueIp, valueSubnet) === 'FAILURE') {
    alert('IP/SUBNET NOT VALID!!!')
    return
  }
  if (valueSubnet < 8 || valueSubnet > 32) {
    alert('Not Support Prefix : ' + valueSubnet)
  }
  calculate(valueIp, valueSubnet)
}
function handleActive(e) {
  if (e.target.classList.contains('inputIp')) {
    inputSubnet.classList.remove('inputActive')
    inputIP.classList.add('inputActive')
  }
  if (e.target.classList.contains('inputSubnet')) {
    inputIP.classList.remove('inputActive')
    inputSubnet.classList.add('inputActive')
  }
}
inputIP.addEventListener('input', handleInput)
inputSubnet.addEventListener('input', handleInputSubnet)
calculateIp.addEventListener('click', handleCalculate)
inputBox.addEventListener('click', handleActive)
