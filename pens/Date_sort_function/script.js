// Date sortFunction
console.clear();

let timeline = [
  "2016-06-06T00:00:00",
  "2014-01-01T00:00:00",
  "2013-02-04T00:00:00",
  "2012-10-17T00:00:00",
  "2012-10-17T00:00:00",
  "2013-01-01T00:00:00",
  "2013-02-01T00:00:00"
];

// random order
console.log("unsorted:", timeline);

timeline.sort((a, b) => {
  return new Date(a) - new Date(b);
});

// chronological order
console.log("chrono:", timeline);
