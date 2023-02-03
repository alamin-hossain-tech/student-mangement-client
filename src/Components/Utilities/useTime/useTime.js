export const useTime = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minuite = date.getMinutes();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentTime = `${day} ${monthNames[month]} ${year} | ${hour}:${minuite}`;
  return currentTime;
};
