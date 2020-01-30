// ShapeDiver Viewer Initialisation
var initSdvApp = function(/*event*/) {
  // settings can be defined here or as attributes of the viewport container
  // settings defined here take precedence
  let settings = {
    ticket:
      "7a21d15e41adac1c456cf6a3b7f3451354d0fe0eb8c2bb1ad7808468508024d0d2c04d2b5fe1f3f71c5f6da0bce1448ef56bed80b01403113f9a3ad3b6cf1716061284c98d130aefb11f1fb40b8f3f5f609e3e743d3f0366536cba9d96608f827cbfa067032240e43c57d6e1ee6a5145092905208836-51f22047d4bdf0640ca0f7d9f5096644",
    modelViewUrl: "eu-central-1", // or 'us-east-1' or address of your own ShapeDiver model view server
    container: document.getElementById("sdv-container")
  };
  // provide global access to the ShapeDiver Viewer API returned by the constructor
  api = new SDVApp.ParametricViewer(settings);
};

// there is a slight chance that loading has been completed already
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSdvApp, false);
} else {
  initSdvApp();
}

// Reset Camera
const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  // alert("button clicked");
  api.scene.camera.updateAsync({
    position: { x: 1000, y: -2500, z: 500 },
    target: { x: 0, y: 0, z: 500 }
  });
});



const getData = () => {
  const allData = api.parameters.get().data;
  const notHiddenData = [];
  const sliders = [];
  const dropdowns = [];

  // const sliderTemplate = document.querySelector(".sliders-template").content;
  // const dropdownTemplate = document.querySelector(".dropdowns-template")
  //   .content;

  // check for non hidden data
  for (const data of allData) {
    if (!data.hidden) {
      notHiddenData.push(data);
    }
  }

  // get all Dropdowns from non hidden data
  for (const dropdown of notHiddenData) {
    if (dropdown.visualization === "dropdown") {
      dropdowns.push(dropdown);

      // let copy = document.importNode(dropdownTemplate, true);
      // document.querySelector("form").appendChild(copy);
    }
  }

  // get all Sliders from non hidden data
  for (const slider of notHiddenData) {
    if (slider.visualization === "slider") {
      sliders.push(slider);

      //   let copy = document.importNode(sliderTemplate, true);
      //   let copyInput = copy.querySelector("input");
      //   let copyLabel = copy.querySelector("label");

      //   copyInput.value = slider.defval;
      //   copyInput.min = slider.min;
      //   copyInput.max = slider.max;
      //   copyInput.id = slider.id;

      //   copyLabel.textContent = slider.name + ": " + slider.value + "mm";
      //   copyLabel.for = slider.id;

      // document.querySelector("form").appendChild(copy);
    }
  }

  // console.log("Here is all none hidden data to play with later");
  // console.log(notHiddenData);

  // console.log("Here is all Sliders to render later");
  // console.log(sliders);

  // console.log("Here is all Dropdowns to render later");
  // console.log(dropdowns);
  return { notHiddenData, dropdowns, sliders };
};

// const logData = () => {
//   // getData()[0] = notHiddenData
//   // getData()[1] = dropdowns
//   // getData()[2] = sliders
//   console.log(getData());
// };

// const getDataBtn = document.getElementById("data");
// getDataBtn.addEventListener("click", logData);


setTimeout(function() {
  
  // Høgde
  høgdeInput.value = getData().sliders[0].defval; // get and sets start value "Høgde"
  høgdeLabel.innerHTML = "Høyde: " + høgdeInput.value / 10 + "cm";

  // Radius
  radiusInput.value = getData().sliders[1].defval; // get and sets start value "Radius"
  radiusLabel.innerHTML = "Fot Radius: " + radiusInput.value / 10 + "cm";

  // Radius
  toppPlateRadiusInput.value = getData().sliders[2].defval; // get and sets start value "ToppPlateRadius"
  toppPlateRadiusLabel.innerHTML = "Topp Plate Radius: " + toppPlateRadiusInput.value / 10 + "cm";

  //  BreddeOppe
  breddeOppeInput.value = getData().sliders[3].defval; // get and sets start value "BreddeOppe"
  breddeOppeLabel.innerHTML = "Bredde Oppe: " + breddeOppeInput.value / 10 + "cm";

  // Bredde
  breddeInput.value = getData().sliders[4].defval; // get and sets start value "Bredde"
  breddeLabel.innerHTML = "Bredde Nede: " + breddeInput.value / 10 + "cm";
  
}, 500);


// Høgde adustment
const høgdeInput = document.getElementById("høgde-input"); 
const høgdeLabel = document.getElementById("høgde-label");
høgdeInput.addEventListener("input", () => {
  høgdeLabel.innerHTML = "Høyde: " + høgdeInput.value / 10 + "cm"; 
  api.parameters.updateAsync([{ name: "Høgde", value: høgdeInput.value }]);
});

// Radius adustment
const radiusInput = document.getElementById("radius-input"); 
const radiusLabel = document.getElementById("radius-label"); 
radiusInput.addEventListener("input", () => {
  radiusLabel.innerHTML = "Fot Radius: " + radiusInput.value / 10 + "cm"; 
  api.parameters.updateAsync([{ name: "Radius", value: radiusInput.value }]);
});

// ToppPlateRadius adustment
const toppPlateRadiusInput = document.getElementById("topp-plate-radius-input");
const toppPlateRadiusLabel = document.getElementById("topp-plate-radius-label"); 
toppPlateRadiusInput.addEventListener("input", () => {
  toppPlateRadiusLabel.innerHTML = "Topp Plate Radius: " + toppPlateRadiusInput.value / 10 + "cm";
  api.parameters.updateAsync([{ name: "ToppPlateRadius", value: toppPlateRadiusInput.value }]);
});

// BreddeOppe adustment
const breddeOppeInput = document.getElementById("bredde-oppe-input");
const breddeOppeLabel = document.getElementById("bredde-oppe-label"); 
breddeOppeInput.addEventListener("input", () => {
  breddeOppeLabel.innerHTML = "Bredde Oppe: " + breddeOppeInput.value / 10 + "cm";
  api.parameters.updateAsync([{ name: "BreddeOppe", value: breddeOppeInput.value }]);
});

// // Bredde adustment
const breddeInput = document.getElementById("bredde-input"); 
const breddeLabel = document.getElementById("bredde-label");
breddeInput.addEventListener("input", () => {
  breddeLabel.innerHTML = "Bredde Nede: " + breddeInput.value / 10 + "cm"; 
  api.parameters.updateAsync([{ name: "Bredde", value: breddeInput.value }]);
});

// const a = api.parameters.get().data

// Set Value = api.parameters.updateAsync([{name: "Count H",value: 6}]);

// export api.exports.get();
// api.exports.requestAsync({name: "Download"});

// copyInput.addEventListener("onChange", () => {
//   copyLabel.textContent = slider.name + ": " + copyInput.value + "mm";
// })

// on render set all values for input and lables on load