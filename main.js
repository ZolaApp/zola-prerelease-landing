function getParams(url) {
  try {
    var params = {}
    var parser = document.createElement('a')
    parser.href = url

    var query = parser.search.substring(1)
    var vars = query.split('&')

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      params[pair[0]] = decodeURIComponent(pair[1])
    }

    return params
  } catch (error) {
    return {}
  }
}

function toggleAlert() {
  var URL = window.location.href
  var params = getParams(URL)

  if ('formCompleted' in params && params.formCompleted === '1') {
    var $alert = document.querySelector('.alert')
    $alert.setAttribute('aria-hidden', 'false')

    setTimeout(function() {
      $alert.setAttribute('aria-hidden', 'true')
    }, 5000)
  }
}

function bindInterestedLink() {
  var $interestedLink = document.querySelector('.header__action a')
  var $emailInput = document.querySelector('[name="email"]')

  $interestedLink.addEventListener('click', function(e) {
    e.preventDefault()
    $emailInput.focus()
  })
}

function changeActiveFakeRadio(selectedIndex) {
  var SELECTED_CLASS = 'selected'

  $fakeRadios.forEach(function($radio, index) {
    if (index == selectedIndex) {
      return $radio.classList.add(SELECTED_CLASS)
    }

    $radio.classList.remove(SELECTED_CLASS)
  })
}

function bindRealRadios() {
  $realRadios.forEach(function($radio) {
    $radio.addEventListener('change', function(event) {
      var selectedIndex = event.target.getAttribute('data-index')
      changeActiveFakeRadio(selectedIndex)
    })
  })
}

function changeActiveRealRadio(selectedIndex) {
  $realRadios.forEach(function($radio, index) {
    if (index == selectedIndex) {
      $radio.checked = true
      return
    }

    $radio.checked = false
  })
}

function bindFakeRadios() {
  $fakeRadios.forEach(function($radio) {
    $radio.addEventListener('click', function(event) {
      var selectedIndex = event.target.getAttribute('data-index')

      changeActiveRealRadio(selectedIndex)
      changeActiveFakeRadio(selectedIndex)
    })
  })
}

var $realRadios = document.querySelectorAll('.plan-radio')
var $fakeRadios = document.querySelectorAll('.item')

try {
  toggleAlert()
  bindInterestedLink()
  bindRealRadios()
  bindFakeRadios()
} catch (error) {
  // Swallow error, but don’t worry your data is safe with us. … :)
}
