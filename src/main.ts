type Marks = {
  category: string;
  score: number;
  icon: string;
  color: string;
};
const OUT_OF = 100;

const updateMarks = (data: Marks[]) => {
  const marksList = document.querySelector(
    "[data-marks-list]"
  ) as HTMLUListElement;
  const resultAvg = document.querySelector(
    "[data-result-avg]"
  ) as HTMLDivElement;

  let totalMarks = 0;

  data.forEach((mark) => {
    totalMarks += mark.score;
    const listItem: HTMLLIElement = document.createElement("li");
    listItem.style.setProperty("--_clr", mark.color);
    listItem.innerHTML += `<img src=${mark.icon} alt=${mark.category}>`;
    listItem.innerHTML += `<span>${mark.category}</span>`;
    listItem.innerHTML += `<span data-marks=""><strong>${mark.score}</strong> / ${OUT_OF}</span>`;
    marksList.appendChild(listItem);
  });

  const avg = (totalMarks / (data.length * OUT_OF)) * 100;
  const roundedAvg = Math.round(avg);
  resultAvg.innerHTML = `<strong>${roundedAvg}</strong><span>of ${OUT_OF}</span>`;
};

async function fetchMarks() {
  try {
    const res = await fetch("/data.json");
    const data: Marks[] = await res.json();
    updateMarks(data);
  } catch (error: any) {
    console.log(error);
  }
}

fetchMarks();
