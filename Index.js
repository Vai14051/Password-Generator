const inputsilder = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copymsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const generateBtn = document.querySelector(".generatebutton");
const indicator = document.querySelector("[data-indicator]");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbo = '~!@#$%^&*()_+{||:"<>?/.,';

let password = "";
let passwordLength = 10; // by default
let checkcount = 0;
handleSlider();
serIndicator("#ccc");

// set indicator color to gery
// pasword ki length ko set kar dega 
function handleSlider()
{
    inputsilder.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function serIndicator(color)
{

    indicator.style.backgroundColor = color;
    // shadow home

}

function getRndInteger(min,max)
{
  return  Math.floor(Math.random() * (max - min)) + min;

}

function generateRndNumber()
{
    return getRndInteger(0, 9);
}

function generateLowerCase()
{
    return String.fromCharCode(getRndInteger(97, 123)); // doing with ascii value remember it 
}
function generateUpperCase()
{
    return String.fromCharCode(getRndInteger(65, 91)); // doing for upper cases letter
}

function generateSymbol()
{
    const randNum = getRndInteger(0, symbo.length);
    return symbo.charAt(randNum);
}

function calcStrength()
{
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassym = false;
    if (uppercaseCheck.checked) hasupper = true;
    if (lowercaseCheck.checked) haslower = true;
    if (numberssCheck.checked) hasnum = true;
    if (symbolsCheck.checked) hassym = true;

    if (hasupper && haslower && (hasnum || hassym) && passwordLength >= 0)
    {
        serIndicator("#0f0");
    }
    else if ((haslower || hasupper) && (hasnum || hassym) && passwordLength >= 6)
    {
        serIndicator("#ff0");
    }
    else {
        serIndicator("#f00")
    }
}

async function copyContent()
{
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText = "copied";

    }
    catch (e)
    {
        copymsg.innerText = "Failed";
    }

    copymsg.classList.add("active");

    setTimeout(() => copymsg.classList.remove("active"), 2000);

}

function shufflePassword(array)
{
    //  fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;


}
function handlecheckboxchange()
{
    checkcount = 0;
    allcheckBox.forEach( (checkbox) => {
        if (checkbox.checked)
        {
            checkcount++;
        }
    });

    // special condition 
    if (passwordLength < checkcount)
    {
        passwordLength = checkcount;
        handleSlider();
    }

}

allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckboxchange);
})

// allcheckBox.forEach((checkbox) => { checkbox.addEventListener('change', handlecheckboxchange) });
// for (let k in allcheckBox)
// {
//     // k.addEventListener('change', handlecheckboxchange);
//     console.log(k);
// }



inputsilder.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', function () {
    if (passwordDisplay.value)
    {
        copyContent();
    }
})






generateBtn.addEventListener('click', () => {

    //  none of the checkbox is not checked
    if (checkcount == 0)
    {
        return;

    }
    if (passwordLength < checkcount)
    {
        passwordLength = checkcount;
        handleSlider();
    }

    // let's start the joruney is to find new passowrd

    // remove old password
        password = "";

    // let;s put the stuff mentioned by checkboxes

    // if (uppercaseCheck.checked)
    // {
    //     password += generateUpperCase();
    // }
    // if (lowercaseCheck.checked)
    //     {
    //         password += generateLowerCase();
    // }
    // if (numbersCheck.checked)
    //     {
    //         password += generateRndNumber();
    // }
    // if (symbolsCheck.checked)
    //     {
    //         password += generateSymbol();
    //     }

    let functionarr =[];
    if (uppercaseCheck.checked)
    {
        functionarr.push(generateUpperCase);
    }
    if (numbersCheck.checked)
        {
            functionarr.push(generateRndNumber);
    }
    if (lowercaseCheck.checked)
        {
            functionarr.push(generateLowerCase);
    }
    if (symbolsCheck.checked)
        {
            functionarr.push(generateSymbol);
        }

    // compulsary addition
    for (let i = 0; i < functionarr.length; i++)
    {
        password += functionarr[i]();
    }
    console.log("complusory addition done");

    //reaminging addition
    for (let i = 0; i < passwordLength - functionarr.length; i++)
        {
        let randIndex = getRndInteger(0, functionarr.length);
        password += functionarr[randIndex]();
    }
    console.log("Remaining addition done");

    // shuffle password
    password = shufflePassword(Array.from(password));
    console.log("shuffling done");
    // show all password in UI

    
    passwordDisplay.value = password;
    //  calcu strength
    calcStrength();

});