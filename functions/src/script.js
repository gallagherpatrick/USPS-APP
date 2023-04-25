var oAppEnablementCommonInstance = new comGkSoftwareGkrAppEnablementApi.Common();
var oAppEnablementExternalMasterdataInstance = new comGkSoftwareGkrAppEnablementApi.ExternalMasterdata();
var oAppEnablementMasterdataInstance = new comGkSoftwareGkrAppEnablementApi.Masterdata();
var oAppEnablementPosInstance = new comGkSoftwareGkrAppEnablementApi.Pos();
let parser = new DOMParser();
let xmlDoc;

async function sendRegisterExternalItem(sRegularUnitPrice) {
    var sUnitOfMeasureCode = "PCE"
    var sItemType = "CO"
    
    var iQuantity = 1;
    var sTaxGroupID = "A1"
    
    let sItemID = 134596;
    // let sRegularUnitPrice = 12.00;
    let sReceiptText = "Test";
    let sPosItemID = 1345960000;
    
    var oRequest = {
        "itemID": sItemID,
        "unitOfMeasureCode": sUnitOfMeasureCode,
        "itemType": sItemType,
        "actualUnitPrice": sRegularUnitPrice,
        "quantity": iQuantity,
        "receiptText": sReceiptText,
        "registrationNumber": sPosItemID,
        "mainPOSItemID": sPosItemID,
        "taxGroupID": sTaxGroupID
    };
    console.log("Registering External Item", "SEND REQUEST");
    console.log(JSON.stringify(oRequest));
    //comGkSoftwareGkrAppEnablementApi.Pos.prototype.registerExternalLineItem(registerDataOk, registerDataFailed, JSON.stringify(oRequest));
    oAppEnablementPosInstance.registerExternalLineItem('registerDataOk', 'registerDataFailed', JSON.stringify(oRequest));
}
function registerDataOk() {
console.log("Succesfully registered", "SEND REQUEST");
console.log("Succesfully registered", "success");
}
function registerDataFailed() {
console.error("Registration error.", "SEND REQUEST");
console.error("Data registration failed");
}

const dataConstructor = function(){
    let oData = document.querySelector('#weight').value;
    let pounds;
    let ounces;
    let zip = document.querySelector('#zip').value;
    if(!oData.includes(".")){
        pounds = oData;
        ounces = 0;
    } else {
        pounds = oData.split(".")[0];
        ounces = oData.split(".")[1];
    }
    console.log(parseInt(zip));
    if(zip.length != 5 || isNaN(parseInt(zip))){
        console.log("line 60")
        let zipHtml = document.querySelector('#zip');
        zipHtml.placeholder = "Please enter a valid 5-digit zip code";
        zipHtml.classList.add('bg-red-200');
        zipHtml.addEventListener("click", function removeBackground() {
            zipDoc.classList.remove("bg-red-200");
        })
        return console.log("Stuff")
    }
    let raw = JSON.stringify({
        "data": {
            "pounds": pounds,
            "ounces": ounces,
            "zip": zip,
            "height": document.querySelector('#height').value,
            "width": document.querySelector('#width').value,
            "length": document.querySelector('#length').value
        }
    })
    return raw
}

const getRate = async function(){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = dataConstructor();
    if(!raw){
        return console.log("Get rate is not sent")
    }
    const req = await fetch(`http://localhost:5173/test`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    });
    const res = await req.text();
    xmlDoc = await parser.parseFromString(res, 'text/xml');
    console.log(xmlDoc);
    let rate = await xmlDoc.getElementsByTagName("Rate")[0].innerHTML
    sendRegisterExternalItem(rate);
    document.getElementById('rate').innerHTML = rate;
}

let zipDoc = document.getElementById('zip');
zipDoc

console.log("Hello world");