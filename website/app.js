/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// api key for the openwheathermp web api
const apiKey = "c5e3c4d54241f8f9dc03491b92f62b8d&units=imperial";

// global variables to hold user inputs
let zipCode;
let feelingsInput;
let input = document.querySelector("#zip");
let generateBTN = document.querySelector("#generate");
let feelings = document.querySelector("#feelings");

// helper fn to build the api url
const constructApiUrl = (zip) => {
  return `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
};

// callback fn to be called on retriving of the whether
const whetherReady_CB = (whether) => {
  //   console.log("whether", whether);
  const { temp } = whether.main;
  //   console.log("temp = ", temp);
  addWhether("/addWhether", {
    date: newDate,
    temp: temp,
    userFeeling: feelingsInput,
  });
  getProjectData("/projectData");
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

// getWhetherFromWeatherApi("94040,us");

// api to post the weather to our local server
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

// addWhether("/addWhether", { date: "11/11", temp: "23" });
// addWhether("/addWhether", { date: "11/12", temp: "23" });

// call back called at getting the data from local server
const projectDataReady_CB = (projectData) => {
  console.log("projectData", projectData);
  const allData = projectData;
  document.getElementById("temp").innerHTML =
    Math.round(allData.temp) + " degrees";
  document.getElementById("content").innerHTML = allData.feelingsInput;
  document.getElementById("date").innerHTML = allData.date;
};

// api to get project data
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

// getProjectData("/projectData");

// Dom Work

// add event listner

generateBTN.addEventListener("click", () => {
  handleGenerateBtnClicked();
});

// handler method for clicking the generate btn
const handleGenerateBtnClicked = () => {
  //   console.log("btn clicked");
  zipCode = input.value;

  feelingsInput = feelings.value;
  //   console.log("inp", input);
  //   console.log("userInput", zipCode + " " + feelingsInput);

  getWhetherFromWeatherApi(zipCode);
};
