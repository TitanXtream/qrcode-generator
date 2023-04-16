const spinner = document.querySelector("#spinner");
const qr = document.getElementById("qrcode");
const genrateAlert = document.getElementById("genrate-alert");

const handleSubmit = (event) => {
  event.preventDefault();

  clearUI();
  genrateAlert.style.display = "none";

  qr.style.display = "block";

  console.dir(event.target);

  const formData = new FormData(event.target);
  console.log(formData);

  const url = formData.get("url");
  const size = formData.get("size");

  if (url === "") return alert("Please give an url");
  else {
    showSpinner(true);

    showSpinner(true);
    // Show spinner for 1 sec
    setTimeout(() => {
      showSpinner(false);
      generateQRCode(url, size);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector("img").src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

/**
 *@params {boolean} boolean
 */
const showSpinner = (boolean = false) => {
  if (boolean === true) spinner.style.display = "block";
  else spinner.style.display = "none";
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5 text-center sm:text-[16px] text-[12px]";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

showSpinner(false);
