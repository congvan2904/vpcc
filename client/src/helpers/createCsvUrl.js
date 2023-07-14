const createCsvUrl = (data) => {
  const csvData = data.map(row => row.join(',')).join('\n');
  const csvBlob = new Blob([csvData], { type: 'text/csv' });
  return URL.createObjectURL(csvBlob);
}
export default createCsvUrl