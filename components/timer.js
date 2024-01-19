export default function timer(duration){
    let circle = document.getElementById('cr'); 
    let dashArray = circle.attributes['stroke-dasharray'].value;
    let time = duration ; 
    let x = setInterval(function() {
    let end  = duration ; 
    circle.style.strokeDashoffset  = dashArray - (dashArray * time) / end ; 
    let second = Math.ceil((time/1000)) ; 
    timer.lastElementChild.innerHTML = second+" seconds" ; 
    time  = time - 10 ; 
    if(time < 0){
        clearInterval(x)
    }
    if(time < ( end / 5 )){
        document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
    }
    // if(time < (end / 3)){
    //     document.querySelector('svg circle:first-child').style.stroke = 'red' ; 
    //     // document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
    // }
    },10)

}