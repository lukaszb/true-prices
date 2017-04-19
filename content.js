console.log(" => True Price loaded v3")

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
  const element = elements[i]
  if (!shouldProcess(element)) {
    continue
  }
  if (hasPrice(element)) {
    updatePrice(element)
  }
}


function shouldProcess(element) {
  return element.tagName === 'SPAN'
}




function hasPrice(element) {
  const re = /(\d+)([,\.])(\d+)(\s*)(zł|pln)/i
  let text = element.textContent
  let searchIdx = text.search(re)
  return searchIdx >= 0
}


function updatePrice(element) {
  const re = /(\d+)([,\.])(\d+)(\s*)(zł|pln)/i
  let text = element.textContent

  let endings = new Set(['9', '99', '90'])

  element.textContent = element.textContent.replace(re, (match, wholeString, sep, decimalString, whitespace, currency, offset, string) => {
    if (endings.has(decimalString)) {
      let newPrice = new Number(wholeString) + 1
      return [newPrice, whitespace, currency].join('')
    } else {
      return string
    }
  })
}
