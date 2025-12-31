const openFeatures = () => {
    let cards = document.querySelectorAll('.cards div')
    let full = document.querySelectorAll('.fulls')
    let backBtn = document.querySelectorAll('.back-btn')

    cards.forEach((elem, idx) => {
        elem.addEventListener('click', () => {
            full[idx].style.left = '0'

        })
        elem.addEventListener('click', () => {
            backBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    full[idx].style.left = '-100%'

                })

            })
        })
    })
}
openFeatures();

function Todo() {
    let form = document.querySelector('.todo-full .bottom .left form')
    let input = document.querySelector('.todo-full .bottom .left input')
    let textArea = document.querySelector('.todo-full .bottom .left textarea')
    let right = document.querySelector('.todo-full .bottom .right')



    let currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }

    function renderTask() {
        let clutter = ''
        currentTask.forEach((elem, idx) => {
            clutter = clutter + `<div>
        <div class="task-left">
            <input type="checkbox" name="" id="">
            <h2> ${elem.task} </h2>
        </div>
        <div class="task-right">
   
            <button class='task-btn' id="${idx}">Delete Task</button>
        </div>
        </div>
    </div>`

            right.innerHTML = clutter
        })
    }
    renderTask()





    form.addEventListener('submit', (e) => {
        e.preventDefault()
        currentTask.push({ task: input.value })
        renderTask()
        location.reload()
        localStorage.setItem('currentTask', JSON.stringify(currentTask))


    })

    let deleteTask = document.querySelectorAll('div .task-btn')
    deleteTask.forEach((elem) => {
        elem.addEventListener('click', () => {
            currentTask.splice(elem.id, 1)
            location.reload()
            renderTask()
            localStorage.setItem('currentTask', JSON.stringify(currentTask))
        })

    })
}

Todo();

function DailyPlanner() {

    let arr = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00-${7 + idx}:00`)
    let tasks = document.querySelector('.daily-full .bottom')
    let clutter = '';
    arr.forEach((elem, idx) => {
        clutter += ` <div class='tasks-div' id='${idx}'>
    <input type="text" placeholder="........">
    <p> ${arr[idx]} </p>
    </div> `
    })

    tasks.innerHTML = clutter

    let inputs = document.querySelectorAll('.daily-full .bottom .tasks-div input')
    dayplandata = {}
    dayplandata = JSON.parse(localStorage.getItem('dailytasks'))

    inputs.forEach((elem, idx) => {
        if (dayplandata[idx]) {
            elem.value = dayplandata[idx]
        }
    })

    inputs.forEach((elem, idx) => {
        elem.addEventListener('input', function (e) {
            dayplandata[idx] = e.target.value;
            localStorage.setItem('dailytasks', JSON.stringify(dayplandata));
        })
    });
}

DailyPlanner()

function Pomo() {

    let selectBtns = document.querySelectorAll('.pomo-full .bottom .time-elements .selecttime button')

    function pomoTime(mins) {
        let startBtn = document.querySelector('.pomo-full .bottom .time-elements .buttons .start-btn')

        let stopBtn = document.querySelector('.pomo-full .bottom .time-elements .buttons .stop-btn')

        let resetBtn = document.querySelector('.pomo-full .bottom .time-elements .buttons .reset-btn')

        let time = document.querySelector('.pomo-full .bottom .time-elements .time h1')


        let totSeconds = mins * 60;

        let timerInterval = null;

        function updateTime() {
            let minutes = Math.floor(totSeconds / 60);
            let seconds = Math.floor(totSeconds % 60);
            time.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        }
        updateTime()
        function resetTimer() {
            clearInterval(timerInterval)
            totSeconds = 25 * 60;
            updateTime()

        }

        function startTimer() {
            clearInterval(timerInterval)
            timerInterval = setInterval(() => {
                totSeconds--
                if (totSeconds <= 0) {
                    resetTimer()
                }
                updateTime()

            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval)
        }



        startBtn.addEventListener('click', startTimer)
        stopBtn.addEventListener('click', stopTimer)
        resetBtn.addEventListener('click', resetTimer)

    }

    selectBtns.forEach((elem) => {
        elem.addEventListener('click', (dets) => {
            if (dets.target.id === 'short-btn') {
                pomoTime(5);

            } else if (dets.target.id === 'long-btn') {
                pomoTime(10);

            }
        })

    })
    pomoTime(25);
}

Pomo()

function motivationalQuotes() {
    let h1 = document.querySelector('.quotes-full .bottom .quotes h1')

    let author = document.querySelector('.quotes-full .bottom .quotes h3')

    async function getQuotes() {
        let raw = await fetch(`https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom`, {
            headers: {
                'X-Api-Key': 'OwJEzxMzlKTtMJMGQbiIfg==Dri9203FC2qi13PP'
            }
        })

        let data = await raw.json()

        h1.innerHTML = `" ${data[0].quote} "`;

        author.innerHTML = data[0].author;

        console.log(data);



    }

    getQuotes()
}

motivationalQuotes();