const fetchData = async () => {
  const results = await fetch(
    "https://lip.betway.co.za//LiveUpdate/GetLiveInPlayOutcomeUpdates?Eid=0307e9a3-,0307e9a9-,0307e9ad-*&Oid=&mt=de677d0c-e70f-e811-80d9-00155d4cf18a&sId=00000000-0000-0000-da7a-000000550001&lps=218304593&sGroupId=undefined&mts=&set=1&lIds=5546c4d7-d816-e811-80cd-00155d4cf19b&fId=null"
  );

  const data = await results.json();

  console.log(data);
};

fetchData();
