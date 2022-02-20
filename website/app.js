/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// api key for the openwheathermp web api
const apiKey = "c5e3c4d54241f8f9dc03491b92f62b8d";

// helper fn to build the api url
const constructApiUrl = (zip) => {
  return `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
};

// callback fn to be called on retriving of the whether
const whetherReady_CB = (whether) => {
  console.log("whether", whether);
  const { temp } = whether.main;
  console.log("temp = ", temp);
};

// async function to get the whether from the web api
const getWhetherFromWeatherApi = (zip) => {
  const finalURL = constructApiUrl(zip);
  return fetch(finalURL)
    .then((res) => {
      //   console.log(res);
      res
        .json()
        .then((data) => whetherReady_CB(data))
        .catch((e) => console.log("error in parsing"));
    })
    .catch((e) => console.log("errorInGetWhether", e));
};

getWhetherFromWeatherApi("94040,us");

const addWhether = (url, data) => {
  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => console.log("error", e));
};

addWhether("/addWhether", { date: "11/11", temp: "23" });
addWhether("/addWhether", { date: "11/12", temp: "23" });

const projectDataReady_CB = (projectData) => {
  console.log("projectData", projectData);
};

const getProjectData = (url) => {
  fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
  })
    .then((response) => {
      // console.log
      response
        .json()
        .then((data) => projectDataReady_CB(data))
        .catch((e) => console.log("error in parsing", e));
    })
    .catch((e) => console.log("error", e));
};

getProjectData("/projectData");

// Dom Work

let input = document.querySelector("#zip");
let generateBTN = document.querySelector("#generate");
let feelings = document.querySelector("#feelings");

generateBTN.addEventListener("click", () => {
  handleGenerateBtnClicked();
});

const handleGenerateBtnClicked = () => {
  console.log("btn clicked");
  let zipCode = input.value;

  let feelingsInput = feelings.value;
  console.log("inp", input);
  console.log("userInput", zipCode + " " + feelingsInput);

  getWhetherFromWeatherApi(zipCode).then((data) => console.log("data", data));
};
