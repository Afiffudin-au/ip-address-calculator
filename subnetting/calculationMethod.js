function calculationMethod(ip, prefix) {
  let start = window.performance.now()
  let firstIPArray = null
  let lastIPArray = null
  let subnetMask = null
  let ipClass = ''
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
  if (classC && afterSplit[3] !== undefined) {
    beforeCalculations.innerHTML += `<p>Prefix ${prefix} = ${
      ClassIP[`__${prefix}`]
    } IP</>`
    beforeCalculations.innerHTML += `<p>4th Octet = ${afterSplit[3]}</p>`
    beforeCalculations.innerHTML += `<p>Solutions :</p> `
    stepCalculate.innerHTML += `<tr><td>Total IP </td> <td>${
      ClassIP[`__${prefix}`]
    }</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate Network Address</td> <td>${selectArray} / ${
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
    stepCalculate.innerHTML += `<tr><td>Network Address</td> <td>${afterSplit.join(
      '.'
    )} 
    => ${firstIPArray.join('.')} (Network Address) </td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate Broadcast Address</td>  <td>${firstIP} + ${
      ClassIP[`__${prefix}`]
    } - 1 = ${firstIP + ClassIP[`__${prefix}`] - 1}</td></tr>`
    copyArray2[3] = lastIP
    lastIPArray = copyArray2
    stepCalculate.innerHTML += `<tr><td>Broadcast Address <td>${afterSplit.join(
      '.'
    )} 
    => ${lastIPArray.join('.')} (Broadcast Address)</td></tr>`
    subnetMask = 256 - ClassIP[`__${prefix}`]
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
    )} (Network Address) - ${lastIPArray.join(
      '.'
    )} (Broadcast Address)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Usable Host IP Range</td><td>${usableHostIpRange.first.join(
      '.'
    )} - ${usableHostIpRange.last.join(
      '.'
    )} (Between Network and Broadcast)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Number of Usable Hosts</td> <td>${
      ClassIP[`__${prefix}`]
    } (Total IP) - 2 = ${
      ClassIP[`__${prefix}`] - 2 === -1 ? '0 N/A' : ClassIP[`__${prefix}`] - 2
    }</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate Subnet</td> <td>256 - ${
      ClassIP[`__${prefix}`]
    } = ${256 - ClassIP[`__${prefix}`]}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Subnet Mask</td> <td>255.255.255.${subnetMask}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>CIDR Notation</td><td>/${prefix}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>IP Class</td><td>${ipClass}</td></tr>`
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
    stepCalculate.innerHTML += `<tr><td>Calculate Network Address </td> <td> ${selectArray2} / ${IPclass} = ${Math.floor(
      selectArray2 / IPclass
    )} * ${IPclass} = ${Math.floor(selectArray2 / IPclass) * IPclass}</td></tr>`
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[3] = 0
    copyArray[2] = firstIP
    firstIPArray = copyArray
    stepCalculate.innerHTML += `<tr><td>Network Address</td> <td>${afterSplit.join(
      '.'
    )} => ${firstIPArray.join('.')} (Network Address)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate Broadcast Address</td> <td>${firstIP} + ${IPclass} - 1 = ${
      firstIP + IPclass - 1
    }</td></tr>`
    copyArray2[3] = 255
    copyArray2[2] = lastIP
    lastIPArray = copyArray2
    stepCalculate.innerHTML += `<tr><td>Broadcast Address</td> <td>${afterSplit.join(
      '.'
    )} => ${lastIPArray.join('.')} (Broadcast Address)</td></tr>`

    subnetMask = 256 - IPclass
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    stepCalculate.innerHTML += `<tr><td>RANGE IP </td> <td>${firstIPArray.join(
      '.'
    )} (Network Address) - ${lastIPArray.join(
      '.'
    )} (Broadcast Address)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Usable Host IP Range</td> <td>${usableHostIpRange.first.join(
      '.'
    )} - ${usableHostIpRange.last.join(
      '.'
    )} (Between Network and Broadcast)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Number of Usable Hosts </td> <td>${totalIP} (Total IP) - 2 = ${totalIpUsable.toLocaleString()}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate Subnet</td>  <td>256 - ${IPclass} = ${subnetMask}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Subnet Mask </td> <td>255.255.${subnetMask}.0</td></tr>`
    stepCalculate.innerHTML += `<tr><td>CIDR Notation</td><td>/${prefix}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>IP Class</td><td>${ipClass}</td></tr>`
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
    stepCalculate.innerHTML += `<tr><td>Calculate Network Address </td> <td> ${selectArray3} / ${IPclass} = ${Math.floor(
      selectArray3 / IPclass
    )} * ${IPclass} = ${Math.floor(selectArray3 / IPclass) * IPclass}</td></tr>`
    const lastIP = firstIP + IPclass - 1
    const copyArray = [...afterSplit]
    const copyArray2 = [...afterSplit]
    copyArray[1] = firstIP
    copyArray[2] = 0
    copyArray[3] = 0
    firstIPArray = copyArray
    stepCalculate.innerHTML += `<tr><td>Network Address</td> <td>${afterSplit.join(
      '.'
    )} => ${firstIPArray.join('.')} (Network Address)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate Broadcast Address</td> <td>${firstIP} + ${IPclass} - 1 = ${
      firstIP + IPclass - 1
    }</td></tr>`
    copyArray2[1] = lastIP
    copyArray2[2] = 255
    copyArray2[3] = 255
    lastIPArray = copyArray2
    stepCalculate.innerHTML += `<tr><td>Broadcast Address</td> <td>${afterSplit.join(
      '.'
    )} => ${lastIPArray.join('.')} (Broadcast Address)</td></tr>`

    subnetMask = 256 - IPclass
    const copyArray3 = [...firstIPArray]
    copyArray3[3] = copyArray3[3] + 1
    usableHostIpRange.first = copyArray3
    const copyArray4 = [...lastIPArray]
    copyArray4[3] = copyArray4[3] - 1
    usableHostIpRange.last = copyArray4
    stepCalculate.innerHTML += `<tr><td>RANGE IP </td> <td>${firstIPArray.join(
      '.'
    )} (Network Address) - ${lastIPArray.join(
      '.'
    )} (Broadcast Address)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Usable Host IP Range</td> <td>${usableHostIpRange.first.join(
      '.'
    )} - ${usableHostIpRange.last.join(
      '.'
    )} (Between Network and Broadcast)</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Number of Usable Hosts </td> <td>${totalIP} (Total IP) - 2 = ${totalIpUsable.toLocaleString()}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Calculate Subnet</td>  <td>256 - ${IPclass} = ${subnetMask}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>Subnet Mask </td> <td>255.${subnetMask}.0.0</td></tr>`
    stepCalculate.innerHTML += `<tr><td>CIDR Notation</td><td>/${prefix}</td></tr>`
    stepCalculate.innerHTML += `<tr><td>IP Class</td><td>${ipClass}</td></tr>`
    let end = window.performance.now()
    timeExecution.innerHTML = `Execution time: ${Math.floor(end - start)} ms`
  }
}
