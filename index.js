const $ = el => {
    return document.querySelector(el);
}
var hamiT = [
    {id:0,name: 'ضروریات', money: 1123558, img: 'basic-needs.png'},
    {id:1,name: 'آموزش', money: 6500000, img: 'education.png'},
    {id:2,name: 'تفریح', money: 6500000, img: 'recreational.png'},
    {id:3,name: 'بخشیدن', money: 6500000, img: 'gift.png'}
];
var pishtazT = [
    {id:0,name: 'استقلال مالی', money: 17297380.5, img: 'strength.png'},
    {id:1,name: 'پس انداز', money: 17297380.5, img: 'deposit.png'}
];
let data=[hamiT,pishtazT];

var costOp=true;

if (localStorage.getItem("finicialManager") === null) {
    localStorage.setItem("finicialManager", `${JSON.stringify(data)}`);
} else {
    let dataWR = localStorage.getItem("finicialManager");
    let data = JSON.parse(dataWR);
    hamiT=data[0];
    pishtazT=data[1]
}
function save(){
    data=[hamiT,pishtazT];
    localStorage.setItem("finicialManager", `${JSON.stringify(data)}`);
}
var costValues={id:null,txt:null}
$('#hamiValue').innerText = treasureValue(hamiT);
$('#pishtazValue').innerText = treasureValue(pishtazT);
function treasureValue(treasure) {
    let money = 0;
    for (let item of treasure) {
        money += item.money;
    }
    return money.toLocaleString('en-US');
}

function tmplt(data,txt) {
    let i = 0;
    let collection = '';
    for (let item of data) {
        let html = `<section class="flex ${(i + 1 == data.length) ? '' : 'mb-5'}">
                <div class="basis-1/4 inline-flex items-center ml-5">
                    <img src="img/${item.img}">
                </div>
                <div>
                    <h3 class="mb-2">${item.name}</h3>
                    <p>${item.money.toLocaleString('en-US')}</p>
                </div>
                <div onclick="withDrawModal(${item.id},'${txt}')" class="basis-12.5 inline-flex items-center mr-auto cursor-pointer"><img src="img/withdrawal.png" alt=""></div>
            </section>`
        collection += html;
        i++;
    }
    $('#detail-modal').innerHTML = collection;
}

function openModal(treasure) {
    $('.modal-treasure-cont').style.opacity = 1;
    $('.modal-treasure-cont').style.pointerEvents = 'all';
    $('.modal-treasure-cont>.treasure-cont').style.transform = 'translateY(0%)';
    if (treasure == 'hami') {
        tmplt(hamiT,treasure)
    } else if (treasure == 'pishtaz') {
        tmplt(pishtazT,treasure)
    }
}

function closeModal() {
    $('.modal-treasure-cont').style.opacity = 0;
    $('.modal-treasure-cont').style.pointerEvents = 'none';
    $('.modal-treasure-cont>.treasure-cont').style.transform = 'translateY(-50%)';
}

function incomeModal() {
    $('.modal-income-cont').style.opacity = 1;
    $('.modal-income-cont').style.pointerEvents = 'all';
    $('.modal-income-cont>.income-cont').style.transform = 'translateY(0%)';
}

function closeModalIncome() {
    $('.modal-income-cont').style.opacity = 0;
    $('.modal-income-cont').style.pointerEvents = 'none';
    $('.modal-income-cont>.income-cont').style.transform = 'translateY(100%)';
    $('#new-income').value='';
    save();
}

function closeModalCost() {
    $('.modal-cost-cont').style.opacity = 0;
    $('.modal-cost-cont').style.pointerEvents = 'none';
    $('.modal-cost-cont>.cost-cont').style.transform = 'translateY(100%)';
    $('#new-cost').value='';
    save();
}

function withDrawModal(id,txt){
    costValues.id=id;
    costValues.txt=txt;
    $('.modal-cost-cont').style.opacity = 1;
    $('.modal-cost-cont').style.pointerEvents = 'all';
    $('.modal-cost-cont>.cost-cont').style.transform = 'translateY(0%)';
}

function cost(){
    let string=$('#new-cost').value;
    let cost=string.replace(/,/g, '');
    cost*=1;
    if (costValues.txt == 'hami') {
        for(let item of hamiT){
            if(costValues.id==item.id){
                if(costOp){
                    item.money-=cost;
                }else{
                    item.money+=cost;
                }
            }
        }
        $('#hamiValue').innerText = treasureValue(hamiT);
        tmplt(hamiT,costValues.txt)

    } else if (costValues.txt == 'pishtaz') {
        for(let item of pishtazT){
            if(costValues.id==item.id){
                if(costOp){
                    item.money-=cost;
                }else{
                    item.money+=cost;
                }
            }
        }
        $('#pishtazValue').innerText = treasureValue(pishtazT);
        tmplt(pishtazT,costValues.txt)
    }
    closeModalCost()
}
function addComma(id){
    let valueO=$(id).value;
    let valueN=valueO.replace(/,/g, '');
    let value=Number(valueN)
    $(id).value=value.toLocaleString('en-US')
}

function income(){
    let string=$('#new-income').value;
    let income=string.replace(/,/g, '');

    for(let item of hamiT){
        if(item.id==0){
            item.money+=(income*.5);
        }else{
            item.money+=(income*.1);
        }
    }
    for(let item of pishtazT){
        item.money+=(income*.1);
    }
    $('#hamiValue').innerText = treasureValue(hamiT);
    $('#pishtazValue').innerText = treasureValue(pishtazT);
    closeModalIncome();
}
function slider(){
    if(costOp){
        $('.slider').style=`background-color: #16C79A;`;
        $('.slider-btn').style=`background-color: #F8F1F1;`
        $('.slider-btn').style=`margin-right: calc(100% - 15.5px);`
    }else{
        $('.slider').style=`background-color: #F8F1F1;`;
        $('.slider-btn').style=`background-color: #11698E;`
        $('.slider-btn').style=`margin-right: 0;`
    }
    costOp=!costOp;
}