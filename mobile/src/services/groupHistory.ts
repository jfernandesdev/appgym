import { IHistoryItem } from "@components/HistoryCard";

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year.slice(-2)}`; // dd.mm.aa
}

export function groupHistory(data: IHistoryItem[]) {
  const groupedData: { title: string; data: IHistoryItem[] }[] = [];

  data.forEach(item => {
    const formattedDate = formatDate(item.date);
    const section = groupedData.find(section => section.title === formattedDate);

    if(section) {
      section.data.push(item);
    } else {
      groupedData.push({ 
        title: formattedDate, 
        data: [item]
     })
    }
  })

  return groupedData;
}