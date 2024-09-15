// Right now i have to get every one date of phone then append to html

const loadPhone = async (searchText = "13") => {
  const res =
    await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}
        `);
  const data = await res.json();
  const phones = data.data;
  console.log(phones);
  displayPhones(phones);
  toggleSpiner(false);
};

const displayPhones = (phones) => {
  console.log("is it right", phones);
  const showContainer = document.getElementById("show-container");

  if (phones.length > 12) {
    //isShowAll

    showContainer.classList.remove("hidden");
  } else {
    showContainer.classList.add("hidden");
  }

  // show  at least 12 phone at a time in page

  phones = phones.slice(0, 12);

  const phoneContainer = document.getElementById("phone-container");

  // clear container cards before adding new containers cards

  phoneContainer.innerHTML = "";

  phones.forEach((phone) => {
    console.log("this is pappus", phone);
    // Create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100  shadow-xl
        bg-white 
        `;
    // set a innerHTML
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                  <img
                    src="${phone.image}"
                    alt=""
                    class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title">${phone.phone_name}!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions">
                    <button onclick=" 
        handleShowDetails('${phone.slug}');  " class="btn btn-primary">Show Details </button> 
                     

                  </div>
                   </div>
        `;

    // append the child
    phoneContainer.appendChild(phoneCard);
  });
  // toggleSpiner(false)
};

//  handle show details
const handleShowDetails = async  (id) => {
  // console.log("hi this phone details ", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log('hu',data)
  const phone=data.data
  console.log('hi', phone);
  showPhoneDetails(phone);

  
};


const showPhoneDetails = (phone) => {
  console.log('Hello there ',phone)
  // show the model
  show_details_modals.showModal();

  const phoneDetails=document.getElementById('phone-details')
  phoneDetails.innerHTML=`
 <div class="text-center border flex justify-center py-5 bg-[#0D6EFD0D] rounded-lg"> 
  <img class="w-2/3 "src="${phone.image}" alt="">
 </div>
 <div class="  mb-5">
  <h1 class=" font-extrabold	text-black	 text-3xl pt-4	mb-9">${phone.name}</h1>
  <p><span class="text-black font-semibold	">ChipSet: </span>${phone.mainFeatures.chipSet} </P>
    <p><span class=" text-black font-semibold	">Memory: </span>${phone.mainFeatures.memory} </P>
    <p><span class=" text-black font-semibold	">DisplaySize: </span>${phone.mainFeatures.displaySize} </P>
    <p><span class=" text-black  font-semibold	">Storage: </span>${phone.mainFeatures.storage} </P>
    <p><span class=" text-black font-semibold	 ">ReleaseDate: </span>${phone?.mainFeatures?.releaseDate} </P>
    <p><span class=" text-black font-semibold	 ">GPS: </span>${phone?.others?.GPS} </P> 
  </div>


  `
};

//  handle Search  button
const handleSearch = () => {
  //isShowAll
  toggleSpiner(true);

  const SearchField = document.getElementById("Search-field");

  const searchText = SearchField.value;
  console.log(searchText);
  loadPhone(searchText);
};

// const handleSearch2 =() =>{

//     toggleSpiner(true)

//     const searchField=document.getElementById('Search-field2')

//     const searchText=searchField.value
//     console.log(searchText)
//     loadPhone(searchText);

// }

const toggleSpiner = (isLoading) => {
  const loading5 = document.getElementById("loading1");

  if (isLoading) {
    console.log("hi ", loading5);
    loading5.classList.remove("hidden");
  } else {
    loading5.classList.add("hidden");
  }
};

// show the showall button
// const handleShowAll=() => {

//     handleSearch(true)
// }

loadPhone();
