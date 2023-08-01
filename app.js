let inp = document.getElementById("student");
let btn = document.getElementById("btn");


btn.onclick = async function () {
    let checkContainer = document.querySelector(".container");
    if (checkContainer) {
        checkContainer.remove()
    }
    const url = `https://www.alnateega.com/api/search/student/${encodeURIComponent(inp.value)}`
    const response = await fetch(url);
    const data = await response.json();
    const fStudentSeat = await data.data[0].seat_number;

    const studUrl = `https://www.alnateega.com/api/student/${fStudentSeat}`;
    const studReponse = await fetch(studUrl)
    const studData = await studReponse.json()

    //create container
    const container = document.createElement('div');
    container.className = "container"
    document.body.appendChild(container)

    //create h1
    const name = document.createElement("h1")
    name.innerText = studData.data.name

    const seat = document.createElement("h2")
    seat.innerText = studData.data.seat_number

    const total = document.createElement("h2")
    total.innerText = studData.data.results[0].total

    const percent = document.createElement("h2")
    percent.innerText = `${studData.data.results[0].percentage}%`

    const status = document.createElement("h2")
    if (studData.data.results[0].status == "passed") {
        status.innerHTML = "الحالة: <span>ناجح</span>"
        status.className = "passed"
    } else {
        status.innerHTML = "الحالة: <span>راسب</span>"
        status.className = "failed"
    }

    const moreDetails = document.createElement("a")
    moreDetails.innerText = "للتفاصيل عن كل مادة"
    moreDetails.href = `https://www.alnateega.com/student/${studData.data.seat_number}`
    moreDetails.setAttribute("target", "_blank")


    container.appendChild(name)
    container.appendChild(seat)
    container.appendChild(total)
    container.appendChild(percent)
    container.appendChild(status)
    container.appendChild(moreDetails)

}

