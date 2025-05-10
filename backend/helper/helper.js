export const extractedDate = (getDate) => {
    const date = new Date(getDate);

    if (isNaN(date)) {
    //   console.error("Invalid date:", getDate);
      return null;
    }

    // Get local date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // return `${year}-${month}-${day}`;
    return `${day}-${month}-${year}`
  };