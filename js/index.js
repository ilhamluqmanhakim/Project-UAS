// Navbar hover
const a = document.querySelectorAll(".nav");
const navbarRight = document.querySelector(".navbar-right");

// FUNGSI NAVBAR CLICK
const abtnorder = document.querySelector(".a-btnorder");
navbarRight.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav")) {
    a.forEach(function (t) {
      t.className = "nav";
    });
    e.target.classList.add("navaktif");
  }
  abtnorder.style.margin = "auto";
});

// TOMBOL ORDER DARI HOME
const btn = document.querySelector(".home_order");
btn.addEventListener("click", function () {
  setTimeout(() => {
    orderMenu.classList.add("show");
    menu.classList.add("showOrderMenu");
  }, 500);
});

// Show Form Pemesanan
const btnOrder = document.querySelector(".btn-order");
const orderMenu = document.querySelector(".ordermenu");
const menu = document.querySelector(".menu");
const btnClose = document.querySelector(".close-ordermenu");
btnOrder.addEventListener("click", function () {
  orderMenu.classList.add("show");
  menu.classList.add("showOrderMenu");
});

// BTN CLOSE ORDER MENU
btnClose.addEventListener("click", function () {
  orderMenu.classList.remove("show");
  menu.classList.remove("showOrderMenu");
  for (let i = 0; i < btn_nopilih.length; i++) {
    btn_nopilih[i].classList.remove("pilihmenu");
    setpesanan[i].classList.remove("onclick");
    subtotal[i].value = 0;
    inputJum[i].value = 0;
    totalHarga.value = 0;
    inputNama.value = "";
    ket.value = "";
  }
});

// form pemesanan
const setpesanan = document.querySelectorAll(".setpesanan");
const btn_nopilih = document.querySelectorAll(".nopilih");
const btn_minus = document.getElementsByClassName("minus");
const btn_plus = document.getElementsByClassName("plus");
const inputJum = document.querySelectorAll(".inputjumlah");
const subtotal = document.getElementsByClassName("setSubtotal");
const totalHarga = document.querySelector(".totalharga");
const selesaiPesan = document.querySelector(".selesaipesan");
const inputNama = document.querySelector(".inputnama");
const namamenu = document.querySelectorAll(".namemenu");
const ket = document.querySelector(".inputKet");

for (let i = 0; i < btn_nopilih.length; i++) {
  btn_nopilih[i].addEventListener("click", function (e) {
    e.preventDefault();
    btn_nopilih[i].classList.toggle("pilihmenu");
    setpesanan[i].classList.toggle("onclick");
    if (btn_nopilih[i].classList.contains("nopilih")) {
      totalHarga.value = totalHarga.value - subtotal[i].value;
      subtotal[i].value = 0;
      inputJum[i].value = 0;
    }
    setjumlah();
  });
}

// fungsi setjumlah menu

function setjumlah() {
  let count = 0;
  for (let i = 0; i < btn_plus.length; i++) {
    var button = btn_plus[i];
    button.addEventListener("click", function (e) {
      e.preventDefault();
      count++;
      inputJum[i].value = count;

      setSubtotal();
      total();
    });
  }

  for (let i = 0; i < btn_minus.length; i++) {
    var button = btn_minus[i];
    button.addEventListener("click", function (e) {
      e.preventDefault();
      count--;
      if (count >= 0) {
        inputJum[i].value = count;
      } else {
        alert("Jumlah Minimal 0");
      }
      setSubtotal();
      total();
    });
  }

  function setSubtotal() {
    let harga = [15000, 20000];
    let subValue = 0;
    for (let i = 0; i < subtotal.length; i++) {
      let sub = subtotal[i];
      if (i != 2 && i != 4) {
        subValue = harga[0] * inputJum[i].value;
        sub.value = subValue;
      } else {
        subValue = harga[1] * inputJum[i].value;
        sub.value = subValue;
      }
    }
  }

  // Fungsi TOTAL HARGA
  function total() {
    let totalBayar = 0;
    for (let i = 0; i < subtotal.length; i++) {
      if (parseInt(subtotal[i].value)) {
        totalBayar += parseInt(subtotal[i].value);
      }
    }
    totalHarga.value = totalBayar;
  }
}

// FUNGSI TOMBOL SELESAI
const namaStruk = document.querySelector(".nama-struk");
const tglStruk = document.querySelector(".tgl-struk");
const totalStruk = document.querySelector(".totalStruk");
const ketStruk = document.querySelector(".ketStruk");
const struk = document.querySelector(".struk");

selesaiPesan.addEventListener("click", function () {
  namaStruk.value = inputNama.value;
  totalStruk.innerHTML = "RP " + totalHarga.value;
  ketStruk.innerHTML = ket.value;
  orderMenu.classList.remove("show");
  delayStruk();
  tanggalstruk();
  for (let i = 0; i < subtotal.length; i++) {
    if (subtotal[i].value != 0) {
      dataPesanan(
        namamenu[i].ariaValueText,
        inputJum[i].value,
        subtotal[i].value
      );
    }
  }
});

// Fungsi Delay show struk
function delayStruk() {
  setTimeout(() => {
    struk.classList.add("showStruk");
  }, 400);
}

// FUNGSI TANGGAL
function tanggalstruk() {
  let tgl = new Date();
  let tanggal = tgl.getDate();
  let bulan = tgl.getMonth() + 1;
  let tahun = tgl.getFullYear();
  let detik = tgl.getSeconds();
  let menit = tgl.getMinutes();
  let jam = tgl.getHours();

  tglStruk.value =
    tanggal +
    "/" +
    bulan +
    "/" +
    tahun +
    "  " +
    jam +
    ":" +
    menit +
    ":" +
    detik;
}

// FUNGSI DATA MENU STRUK
const strukNama = document.querySelector(".namaStruk");
const strukJumlah = document.querySelector(".jumlahStruk");
const strukSubtotal = document.querySelector(".subStruk");

function dataPesanan(nama, jumlah, sub) {
  let pNama = document.createElement("p");
  let pJumlah = document.createElement("p");
  let pSub = document.createElement("p");

  pNama.innerHTML = nama;
  pJumlah.innerHTML = jumlah;
  pSub.innerHTML = "Rp " + sub;

  pNama.setAttribute("id", "pstruknama");
  pJumlah.setAttribute("id", "pstrukjumlah");
  pSub.setAttribute("id", "pstruksub");

  strukNama.appendChild(pNama);
  strukJumlah.appendChild(pJumlah);
  strukSubtotal.appendChild(pSub);
}

// FUNGSI DOWNLOAD STRUK
const btnDownload = document.querySelector(".downloadStruk");
const dataStruk = document.querySelector(".datastruk");
btnDownload.addEventListener("click", function () {
  domtoimage.toBlob(dataStruk).then(function (blob) {
    window.saveAs(blob, "Struck Bakso Borarsi");
  });
  contactStruk.classList.add("contact-aktif");
});

// FUNGSI HAPUS SEMUA DATA PEMESANAN
function hapusDataPesanan() {
  for (let i = 0; i < btn_nopilih.length; i++) {
    btn_nopilih[i].classList.remove("pilihmenu");
    setpesanan[i].classList.remove("onclick");
    subtotal[i].value = 0;
    inputJum[i].value = 0;
    totalHarga.value = 0;
    inputNama.value = "";
    ket.value = "";
  }
}

// FUNGSI HAPUS DATA STRUK
function hapusDataStruk() {
  namaStruk.value = "";
  totalStruk.innerHTML = 0;
  ketStruk.innerHTML = "";
}

// FUNGSI HAPUS PESANAN STRUK
function hapusPesananStruk() {
  const pstruknama = document.querySelectorAll("#pstruknama");
  const pstrukjumlah = document.querySelectorAll("#pstrukjumlah");
  const pstruksub = document.querySelectorAll("#pstruksub");
  for (let i = 0; i < pstruknama.length; i++) {
    strukNama.removeChild(pstruknama[i]);
    strukJumlah.removeChild(pstrukjumlah[i]);
    strukSubtotal.removeChild(pstruksub[i]);
  }
}

// Lanjutan contact dari Struk
const contactStruk = document.querySelector(".contactStruk");
contactStruk.addEventListener("click", function () {
  menu.classList.remove("showOrderMenu");
  struk.classList.remove("showStruk");
  contactStruk.classList.remove("contact-aktif");
  hapusDataPesanan();
  hapusDataStruk();
  hapusPesananStruk();
});

// ============== JS GALLERY ============

// javascript untuk menu galeri
const fullImg = document.getElementById("imageBox");
function myFunction(smallImg) {
  fullImg.src = smallImg.src;
}

const slide = document.querySelector(".slide-home");
function slideHome() {
  setInterval(() => {
    slide.classList.toggle("aktif");
  }, 7000);
}

slideHome();

// NAV AKTIF SCROLL
const container = document.querySelectorAll("div[id]");
window.addEventListener("scroll", function () {
  const scrollY = window.pageYOffset;
  container.forEach((posisi) => {
    const containerHeight = posisi.offsetHeight;
    const containerTop = posisi.offsetTop - 180;
    const containerId = posisi.getAttribute("id");
    if (scrollY > containerTop && scrollY < containerTop + containerHeight) {
      document
        .querySelector('li a[href*="' + containerId + '"]')
        .classList.add("navaktif");
    } else {
      document
        .querySelector('li a[href*="' + containerId + '"]')
        .classList.remove("navaktif");
    }
  });
});
