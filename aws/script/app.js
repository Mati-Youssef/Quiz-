let card = document.getElementById('card');
let btnGo = document.getElementById('go');
let Name = document.getElementById('name');
let cardbody = document.querySelector('.card-body');
let new_div = document.querySelector('.new-div');

//for stop function setinterval
let idtimer;
let idForgetname;
let faint = false;


function faintTest() {
    window.addEventListener('blur', () => {
        faint = true;
    })
}



//audio
let start = document.getElementById("start");
start.addEventListener("click", function() {
document.querySelector("#audio").innerHTML += `<audio controls autoplay style="display : none">
<source src="assets/img/race-start.mp3" type="audio/ogg">
Your browser does not support the audio element.
</audio>`;
setTimeout(() => {
    document.querySelector("#pageinfo").click();
  }, 5000);
  });

// fetch file json
let url = 'script/Quiz.json';

// fetching URl 
axios.get(url)
    .then((res) => afficheEllement(res.data.question)
    )
    .catch((error) => console.log(error))



// affiche data in index page areas
let array = [];
function afficheEllement(res) {
    array = res;
    array.sort(() => Math.random() - 0.5)
};

let nameusr;
//sweet alert
function timer() {
    clearInterval(idForgetname);
    nameusr = Name.value;
    if (nameusr == '') {
        var div = document.createElement('div');
        div.className = 'new-div';
        cardbody.appendChild(div);
        timediv(3)
    }
    if (nameusr != '') {
        Swal.fire('<h1 id="conter">5</h1>');
        document.querySelector('.swal2-confirm').style.display = 'none';
        timeOfStar(1);
    }
}






// timestar
function timeOfStar(secend) {
    id = setInterval(() => {
        if (secend == 0) {
            document.getElementById('conter').innerText = 'Go';
            document.querySelector('.swal2-confirm').click();
            card.innerHTML = ` <div class="card col-6  ">
            <div class="card-header w-100">
                <h5 class="text-center">Information about Quiz</h5>
            </div>
            <div class="card-body">
                <h5 class="card-title">Some rules for this Quiz:</h5>
                <p class="">1-you will have <span>15 seconds </span>foreach question</p>
                <p class="">2-You can't selectany option once time goes off .</p>
                <p class="">3-you can't exit from the Quiz while you're playing</p>
                <p class="">4-you will get points</p>
            </div>
            <div class="card-footer  d-flex justify-content-end">
                <button class="btn btn-primary" onclick="Star()" id="go">start</button></div>
        </div>`;
            clearInterval(id);
        }
        else {
            document.getElementById('conter').innerText = secend;
        }
        secend--;
    }, 1000);
}





// timer for div 
function timediv(secend) {
    idForgetname = setInterval(() => {
        document.querySelector('.new-div').innerText = 'You Forget Your Name';
        if (secend == 0) {
            document.querySelector('.new-div').innerText = '';
            clearInterval(idForgetname);
        }
        secend--;
    }, 1000);
}


//function  getRandom number 
function getRandomInt(lengthArry) {
    return Math.floor(Math.random() * lengthArry);
}

console.log(Math.random())
// function start
function Star() {
    localStorage.clear();
    clearInterval(idtimer);
    maxclick = array.length;
    afficheQst();
    faintTest();
}

//function affeche Question
let maxclick;
let index = 0;
let pro = -0;
function afficheQst() {
    if (!faint) {
        clearInterval(idtimer);
        let proNum = parseInt(100 / array.length);
        pro += proNum;
      
        // let index = getRandomInt(array.length)
        timeOfQst(14, maxclick);
        document.getElementById('timer').style.display = 'block';
        card.innerHTML = `<div class="card col-6  ">
        <div class="card-header w-100">
            <h5 class="text-center" id="qst">${array[index].Qst}</h5>
        </div>
        <div class="card-body">
        <label id="idQtion" style="display:none">${array[index].Qstid}</label> 
        <div class="time_Pogres" id="time_Pogress"></div>`
        let iQ = 0;
        array[index].choices.forEach(chois => {
            document.querySelector('.card-body').innerHTML += ` 
        <label class="infoA labelBtn"  for="${iQ}">
        <input type="checkbox"  class="infoQ" id="${iQ}" > ${chois}
        </label> 
        </br>`;
            iQ++;
        });
        document.querySelector('.card-body').innerHTML += ` </div>
        <div class="  d-flex justify-content-end">
            <button class="btn btn-primary" onclick="next(${array[index].correctanswer.index})" id="next">Next</button></div>
    </div>`; 
    index++
    maxclick--;
        document.getElementById("time_Pogress").style.width = pro + "%";
        
    }
    else {
        clearInterval(idtimer);
        Swal.fire('<img src="../assets/img/fail-test.jpg" style="width:300px"=alt="Fail" srcset="">')
        
    }

}



// onclick="textchoises('${array[index].correctanswer.index}')"
// function textchoises(chois) {
//     console.log(chois);
//     let checks = document.querySelectorAll('input:checked');
//     checks.forEach(check => {
//         localStorage.setItem(check.id, chois);
//     });
// }




let correct = [];
let incorrect = [];
let numberofCorrect = 0;
let numberofInCorrect = 0;
// -------------------------------------------function next 
function next(crctanswer) {
    console.log(maxclick);
    if (maxclick > 0) {
        // let checkbox0 = document.getElementById('0').checked;
        // let checkbox1 = document.getElementById('1').checked;
        // let checkbox2 = document.getElementById('2').checked;
        // let checkbox3 = document.getElementById('3').checked;
        let idqst = document.querySelector('#idQtion').innerText;
        array.forEach(element => {

            if (element.Qstid == idqst) {

                let checks = document.querySelectorAll('input:checked');
         let checksid = [];
      
         checks.forEach((e)=>checksid.push( parseInt(e.id)))

         let checksidinccorect ='';
         
         if (checksid.length>1){
            checksid.forEach((e)=>{ checksidinccorect= checksidinccorect +checksid[e]})
            let incorrectanswer = [{ "Qstid": idqst ,"checksidinccorect":checksidinccorect}]
            incorrect.push(incorrectanswer);
            numberofInCorrect++
            afficheQst()
         }
         else if(checksid.length==0){
            checksid.forEach((e)=>{ checksidinccorect= checksidinccorect +checksid[e]})
            let incorrectanswer = [{ "Qstid": idqst ,"checksidinccorect":"vide"}]
            incorrect.push(incorrectanswer);
            numberofInCorrect++
            afficheQst()
         }
         else{
            numberofCorrect++;
            let timePassed = document.getElementById('timer').innerText;
            let correctanswer = [{ "Qstid": idqst, "anser": element.choices[checksid[0]], timePassed }]
            correct.push(correctanswer);
            afficheQst()
         }


                // if (checkbox0) {
                //     // let id0 = document.querySelector('label[for="0"]').id
                //     if (crctanswer == 0 && !checkbox1 && !checkbox2 && !checkbox3) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[0], timePassed }]
                //         correct.push(correctanswer);
                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[0] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++;
                      
                //     }
                // }
                // if (checkbox1) {
                //     //  let id1 =  document.querySelector('label[for="1"]').id
                //     if (crctanswer == 1 && !checkbox0 && !checkbox2 && !checkbox3) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[1], timePassed }]
                //         correct.push(correctanswer);
                   
                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[1] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++
                     
                //     }
                // }
                // if (checkbox2) {
                //     //    let id2 =  document.querySelector('label[for="2"]').id
                //     if (crctanswer == 2 && !checkbox1 && !checkbox0 && !checkbox3) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[2], timePassed }]
                //         correct.push(correctanswer);
                        
                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[2] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++
                  
                //     }
                // }
                // if (checkbox3) {
                //     //    let id3 =  document.querySelector('label[for="3"]').id
                //     if (crctanswer == 3 && !checkbox1 && !checkbox2 && !checkbox0) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[3], timePassed }]
                //         correct.push(correctanswer);
                     
                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[3] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++
                    
                //     }
                // }
                // if (numberofInCorrect > 0 && !checkbox0 && !checkbox1 && !checkbox2 && !checkbox3) {
                //     numberofCorrect++
                //     afficheQst()
                // }
            }
        });

        // Object.entries(localStorage).forEach(function ([key, value]) {
        //     let id = document.querySelector('#idQtion').innerText;
        //     let ans = [ {"id":id,"key":key ,"value":value}]
        //     contchecked.push(ans);
        // });
        // if (contchecked.length == 0) {
        //     Swal.fire({
        //         title: 'Are you sure?',
        //         text: "You did not choose any answer!",
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: 'Yes, im sure!'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             if (maxclick > 0) {
        //                 afficheQst()
        //             }
        //         }
        //     })
        // }
        // else {
        // let id = document.querySelector('#idQtion').innerText;
        // array.forEach(qst => {
        //     if (parseInt(id) == qst.Qstid) {
        //         if (contchecked[0][0] == qst.correctanswer.index) {
        //             numberofCorrect++;
        //             localStorage.clear();
        //             afficheQst()
        //         }
        //         else {
        //             localStorage.clear();
        //             afficheQst()
        //         }
        //     }
        // });


        // }
    }
    else {
        console.log('finich')
        Swal.fire({
            title: 'Quiz is finish',
            text: "",
            icon: 'information',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'show result !'
        }).then((result) => {
            console.log(incorrect);
            console.log(correct);
            Swal.fire(nameusr + ' your result :' + numberofCorrect + '/' + array.length)
        })
    }

}



// function set interval for relawd function increment evry 1s

function timeOfQst(secend, maxclick) {
    idtimer = setInterval(() => {
        if (maxclick == 0) {
            clearInterval(idtimer);
        }
        if (maxclick > 0) {
            labelTime = document.querySelector("#timer");
            labelTime.innerText = secend;
            if (secend > 9) {
                labelTime.style.color = " rgb(226, 219, 254)";
                labelTime.style.border = "solid 3px rgb(226, 219, 254)";
            }
            if (secend < 10) { //if secend is less than 9
                let addZero = labelTime.textContent;
                labelTime.style.color = "red";
                labelTime.style.border = "rgb(226, 219, 254)"
                labelTime.style.border = "solid 3px red";
                labelTime.textContent = "0" + addZero; //add a 0 before time value
            }
            if (secend === 0) {
                clearInterval(idtimer);
                labelTime.style.border = "solid 3px rgb(226, 219, 254)";
                labelTime.style.color = "rgb(226, 219, 254)";
                document.getElementById("next").click();
                secend = 15;
            }
            secend--;
        }

    }, 1000);
}

