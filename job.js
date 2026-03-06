const jobs = [
  {title:"Frontend Developer",category:"IT",location:"Delhi"},
  {title:"Backend Developer",category:"IT",location:"Mumbai"},
  {title:"Digital Marketer",category:"Marketing",location:"Noida"},
  {title:"SEO Specialist",category:"Marketing",location:"Pune"},
  {title:"Accountant",category:"Finance",location:"Jaipur"},
  {title:"Financial Analyst",category:"Finance",location:"Lucknow"},
  {title:"UI/UX Designer",category:"IT",location:"Gurgaon"},
  {title:"Sales Manager",category:"Marketing",location:"Chennai"}
];

let currentPage=1;
const perPage=4;
let filteredJobs=[...jobs];

function renderJobs(){
  const start=(currentPage-1)*perPage;
  const end=start+perPage;
  const jobGrid=document.getElementById("jobGrid");
  jobGrid.innerHTML="";

  filteredJobs.slice(start,end).forEach((job,i)=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <h3>${job.title}</h3>
      <p>${job.category}</p>
      <p>${job.location}</p>
      <button onclick="openModal()">Apply</button>
      <button onclick="saveJob('${job.title}')">Save</button>
    `;
    jobGrid.appendChild(card);
  });

  renderPagination();
}

function renderPagination(){
  const totalPages=Math.ceil(filteredJobs.length/perPage);
  const pagination=document.getElementById("pagination");
  pagination.innerHTML="";
  for(let i=1;i<=totalPages;i++){
    const btn=document.createElement("button");
    btn.innerText=i;
    btn.onclick=()=>{currentPage=i;renderJobs();}
    pagination.appendChild(btn);
  }
}

document.getElementById("search").addEventListener("input",filterJobs);
document.getElementById("category").addEventListener("change",filterJobs);

function filterJobs(){
  const search=document.getElementById("search").value.toLowerCase();
  const category=document.getElementById("category").value;

  filteredJobs=jobs.filter(job=>{
    return (job.title.toLowerCase().includes(search)) &&
           (category==="All" || job.category===category);
  });

  currentPage=1;
  renderJobs();
}

function openModal(){
  document.getElementById("modal").style.display="flex";
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}

function submitApplication(){
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;

  if(name==="" || email===""){
    alert("Please fill all fields");
    return;
  }

  alert("Application Submitted Successfully!");
  closeModal();
}

function saveJob(title){
  let saved=JSON.parse(localStorage.getItem("savedJobs"))||[];
  if(!saved.includes(title)){
    saved.push(title);
    localStorage.setItem("savedJobs",JSON.stringify(saved));
    alert("Job Saved!");
  }
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

renderJobs();
