export default function GetFiltredData(allData , userId , clickedCateg , FilterByEmergency , FilterByDate , FilterByCompletion , FilterByActive ) {

  let Data;
  let FiltredData;

  if(allData !== 'load'){

      if (clickedCateg === "all") {
        Data = allData.filter((data) => data.userId === userId);
      } else {
        Data = allData.filter(
          (data) => data.userId === userId && data.nameCategory === clickedCateg
        );
      }
    
      if (FilterByEmergency) {
        FiltredData = Data.filter((data) => data.isImportant === true);
        Data = FiltredData;
      }
      if (FilterByCompletion) {
        FiltredData = Data.filter((data) => data.isDone === true);
        Data = FiltredData;
      }
      if (FilterByActive) {
        FiltredData = Data.filter((data) => data.isDone === false);
        Data = FiltredData;
      }
      if (FilterByDate !== "") {
        FiltredData = Data.filter(
          (data) =>
            new Date(data.createdAt).getFullYear() ===
              new Date(FilterByDate).getFullYear() &&
            new Date(data.createdAt).getMonth() + 1 ===
              new Date(FilterByDate).getMonth() + 1 &&
            new Date(data.createdAt).getDate() === new Date(FilterByDate).getDate()
        );
        Data = FiltredData;
      }
    
      return Data;
  }

}
