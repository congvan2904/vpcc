const createCsvUrl = (data) => {
  const csvData = data.map(row => row.join(',')).join('\n');
  const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(csvBlob);
}
export default createCsvUrl