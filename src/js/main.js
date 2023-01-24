document.addEventListener('DOMContentLoaded', function () {
  console.log(`LESGO`); 
  //svg 
  document.getElementById('svg-icons').innerHTML = SVG_SPRITE;

  var alert = document.querySelector('.js--alert');
  var alertClose = document.querySelector('.js--alert-close');

  alertClose.addEventListener('click', function(){
    alert.style.display = 'none';
  })

}, false);

